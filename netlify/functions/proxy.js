/**
 * Netlify Function for proxying joada.net webcam streams
 * 
 * This function will be automatically deployed when you push to Netlify
 * Access it at: https://your-site.netlify.app/.netlify/functions/proxy?url=ENCODED_URL
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const targetUrl = event.queryStringParameters?.url;

    if (!targetUrl) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Missing url parameter' })
        };
    }

    try {
        // Decode the URL
        const decodedUrl = decodeURIComponent(targetUrl);
        
        // Validate that it's a joada.net URL (security measure)
        // Allow both platforms5 (HTML embeds) and platforms6 (API endpoints)
        if (!decodedUrl.includes('joada.net') && 
            !decodedUrl.includes('platforms5.joada.net') && 
            !decodedUrl.includes('platforms6.joada.net')) {
            return {
                statusCode: 403,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Only joada.net URLs are allowed' })
            };
        }
        
        // Check if this is an API request (JSON response expected)
        const isApiRequest = decodedUrl.includes('/api/') || decodedUrl.includes('platforms6.joada.net');

        // Fetch the content from joada.net
        // Set headers to mimic a request from viewsurf.com
        const response = await fetch(decodedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://viewsurf.com/', // Authorized domain
                'Origin': 'https://viewsurf.com', // Also set Origin header
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: response.statusText })
            };
        }

        // Handle API requests (JSON responses)
        if (isApiRequest) {
            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json') 
                ? await response.json() 
                : await response.text();
            
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': contentType || 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Referer, Origin'
                },
                body: typeof data === 'string' ? data : JSON.stringify(data)
            };
        }

        // Get the HTML content (for embed pages)
        let html = await response.text();
        
        // Modify the HTML to fix relative URLs
        html = html
            .replace(/src="\//g, 'src="https://platforms5.joada.net/')
            .replace(/href="\//g, 'href="https://platforms5.joada.net/')
            .replace(/action="\//g, 'action="https://platforms5.joada.net/');
        
        // Inject JavaScript to bypass referrer checks and intercept fetch/XMLHttpRequest
        // Inject BEFORE </head> to ensure it runs before other scripts
        if (html.includes('</head>')) {
            const referrerBypass = `
            <script>
            // Run immediately, before any other scripts - CRITICAL: Must run first!
            (function() {
                'use strict';
                
                // Get proxy URL helper
                function getProxyUrl(targetUrl) {
                    const currentOrigin = window.location.origin;
                    const proxyPath = currentOrigin.includes('netlify.app') 
                        ? '/.netlify/functions/proxy'
                        : (currentOrigin.includes('localhost') ? '/api/proxy' : '/.netlify/functions/proxy');
                    return currentOrigin + proxyPath + '?url=' + encodeURIComponent(targetUrl);
                }
                
                // Override document.referrer
                Object.defineProperty(document, 'referrer', {
                    get: function() { return 'https://viewsurf.com/'; },
                    configurable: true
                });
                
                // Intercept fetch requests to proxy through our server
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                    let url = typeof args[0] === 'string' ? args[0] : args[0].url;
                    // Proxy ALL joada.net requests (platforms5, platforms6, or any subdomain)
                    if (url && url.includes('joada.net')) {
                        // Don't proxy if already proxied
                        if (!url.includes('/.netlify/functions/proxy') && !url.includes('/api/proxy')) {
                            const proxiedUrl = getProxyUrl(url);
                            console.log('[Proxy] Intercepting fetch:', url, '->', proxiedUrl);
                            if (typeof args[0] === 'string') {
                                args[0] = proxiedUrl;
                            } else {
                                args[0] = { ...args[0], url: proxiedUrl };
                            }
                            // Remove headers that might cause issues
                            if (args[1] && args[1].headers) {
                                delete args[1].headers['Referer'];
                                delete args[1].headers['Origin'];
                            }
                        }
                    }
                    return originalFetch.apply(this, args);
                };
                
                // Intercept XMLHttpRequest - must be done before any XHR is created
                const originalOpen = XMLHttpRequest.prototype.open;
                const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
                XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                    this._method = method;
                    this._originalUrl = url;
                    // Proxy ALL joada.net requests (platforms5, platforms6, or any subdomain)
                    if (url && url.includes('joada.net')) {
                        // Don't proxy if already proxied
                        if (!url.includes('/.netlify/functions/proxy') && !url.includes('/api/proxy')) {
                            const proxiedUrl = getProxyUrl(url);
                            console.log('[Proxy] Intercepting XHR:', url, '->', proxiedUrl);
                            url = proxiedUrl;
                            this._url = url;
                        } else {
                            this._url = url;
                        }
                    } else {
                        this._url = url;
                    }
                    return originalOpen.apply(this, [method, url, ...rest]);
                };
                
                XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
                    // Don't set Referer/Origin for proxied requests
                    if (this._url && (this._url.includes('/.netlify/functions/proxy') || this._url.includes('/api/proxy'))) {
                        if (header.toLowerCase() === 'referer' || header.toLowerCase() === 'origin') {
                            return;
                        }
                    }
                    return originalSetRequestHeader.apply(this, arguments);
                };
            })();
            </script>
            `;
            html = html.replace('</head>', referrerBypass + '</head>');
        }
        
        const modifiedHtml = html;

        // Return the modified HTML
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'X-Frame-Options': 'ALLOWALL',
                'Access-Control-Allow-Origin': '*',
                'X-Content-Type-Options': 'nosniff',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: modifiedHtml
        };

    } catch (error) {
        console.error('Proxy error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                error: 'Proxy error', 
                message: error.message 
            })
        };
    }
};

