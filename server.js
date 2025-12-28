/**
 * Simple Express proxy server for joada.net webcam streams
 * This bypasses the 403 Forbidden error by proxying requests server-side
 * 
 * Usage:
 *   npm install
 *   npm start
 * 
 * The server will run on http://localhost:3000
 * Access your site at http://localhost:3000
 * Proxy endpoint: http://localhost:3000/api/proxy?url=ENCODED_URL
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Use native fetch (Node 18+) or fallback to node-fetch
let fetch;
try {
    // Try to use native fetch (Node 18+)
    fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
    // Fallback to node-fetch for older Node versions
    fetch = require('node-fetch');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Handle CORS preflight requests
app.options('/api/proxy', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Referer, Origin');
    res.status(200).end();
});

// Proxy endpoint for joada.net URLs
app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        // Decode the URL if it's encoded
        const decodedUrl = decodeURIComponent(targetUrl);
        
        // Validate that it's a joada.net URL (security measure)
        // Allow both platforms5 (HTML embeds) and platforms6 (API endpoints)
        if (!decodedUrl.includes('joada.net') && 
            !decodedUrl.includes('platforms5.joada.net') && 
            !decodedUrl.includes('platforms6.joada.net')) {
            return res.status(403).json({ error: 'Only joada.net URLs are allowed' });
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
            return res.status(response.status).json({ error: response.statusText });
        }

        // Handle API requests (JSON responses)
        if (isApiRequest) {
            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json') 
                ? await response.json() 
                : await response.text();
            
            res.setHeader('Content-Type', contentType || 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Referer, Origin');
            return res.send(typeof data === 'string' ? data : JSON.stringify(data));
        }

        // Get the HTML content (for embed pages)
        let html = await response.text();
        
        // Modify the HTML to fix relative URLs and iframe sources
        html = html
            .replace(/src="\//g, 'src="https://platforms5.joada.net/')
            .replace(/href="\//g, 'href="https://platforms5.joada.net/')
            .replace(/action="\//g, 'action="https://platforms5.joada.net/');
        
        // Inject JavaScript to bypass referrer checks and intercept fetch/XMLHttpRequest
        if (html.includes('</head>')) {
            const referrerBypass = `
            <script>
            (function() {
                // Override document.referrer
                Object.defineProperty(document, 'referrer', {
                    get: function() { return 'https://viewsurf.com/'; },
                    configurable: true
                });
                
                // Intercept fetch requests to proxy through our server
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                    const url = typeof args[0] === 'string' ? args[0] : args[0].url;
                    if (url && (url.includes('joada.net') || url.includes('platforms6.joada.net'))) {
                        // Detect proxy URL - use current page's origin
                        const currentOrigin = window.location.origin;
                        const proxyPath = currentOrigin.includes('netlify.app') 
                            ? '/.netlify/functions/proxy'
                            : (currentOrigin.includes('localhost') ? '/api/proxy' : '/.netlify/functions/proxy');
                        const proxyUrl = currentOrigin + proxyPath + '?url=' + encodeURIComponent(url);
                        args[0] = proxyUrl;
                        // Remove headers that might cause issues
                        if (args[1] && args[1].headers) {
                            delete args[1].headers['Referer'];
                            delete args[1].headers['Origin'];
                        }
                    }
                    return originalFetch.apply(this, args);
                };
                
                // Intercept XMLHttpRequest
                const originalOpen = XMLHttpRequest.prototype.open;
                const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
                XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                    this._url = url;
                    return originalOpen.apply(this, [method, url, ...rest]);
                };
                XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
                    if (this._url && (this._url.includes('joada.net') || this._url.includes('platforms6.joada.net'))) {
                        if (header.toLowerCase() === 'referer' || header.toLowerCase() === 'origin') {
                            return; // Don't override if already set
                        }
                    }
                    return originalSetRequestHeader.apply(this, arguments);
                };
                
                // Intercept XMLHttpRequest to proxy API requests
                const originalSend = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.send = function(...args) {
                    if (this._url && (this._url.includes('joada.net') || this._url.includes('platforms6.joada.net'))) {
                        // Detect proxy URL - use current page's origin
                        const currentOrigin = window.location.origin;
                        const proxyPath = currentOrigin.includes('netlify.app') 
                            ? '/.netlify/functions/proxy'
                            : (currentOrigin.includes('localhost') ? '/api/proxy' : '/.netlify/functions/proxy');
                        const proxyUrl = currentOrigin + proxyPath + '?url=' + encodeURIComponent(this._url);
                        // Re-open with proxied URL
                        const method = this._method || 'GET';
                        originalOpen.call(this, method, proxyUrl, true);
                    }
                    return originalSend.apply(this, args);
                };
            })();
            </script>
            `;
            html = html.replace('</head>', referrerBypass + '</head>');
        }

        // Set appropriate headers
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        // Send the modified HTML
        res.send(html);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ 
            error: 'Proxy error', 
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
    console.log(`📺 Access your site at http://localhost:${PORT}`);
    console.log(`🔗 Proxy endpoint: http://localhost:${PORT}/api/proxy?url=ENCODED_URL`);
});

