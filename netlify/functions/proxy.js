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
        if (!decodedUrl.includes('joada.net') && !decodedUrl.includes('platforms5.joada.net')) {
            return {
                statusCode: 403,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Only joada.net URLs are allowed' })
            };
        }

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
                body: `Error: ${response.statusText}`
            };
        }

        // Get the HTML content
        let html = await response.text();
        
        // Modify the HTML to fix relative URLs
        html = html
            .replace(/src="\//g, 'src="https://platforms5.joada.net/')
            .replace(/href="\//g, 'href="https://platforms5.joada.net/')
            .replace(/action="\//g, 'action="https://platforms5.joada.net/');
        
        // Try to bypass JavaScript referrer checks by injecting code
        if (html.includes('</head>')) {
            const referrerBypass = `
            <script>
            (function() {
                Object.defineProperty(document, 'referrer', {
                    get: function() { return 'https://viewsurf.com/'; },
                    configurable: true
                });
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
                'Access-Control-Allow-Origin': '*'
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

