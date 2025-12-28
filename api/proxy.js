/**
 * Vercel Serverless Function for proxying joada.net webcam streams
 * 
 * This function will be automatically deployed when you push to Vercel
 * Access it at: https://your-site.vercel.app/api/proxy?url=ENCODED_URL
 */

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        // Decode the URL
        const decodedUrl = decodeURIComponent(targetUrl);
        
        // Validate that it's a joada.net URL (security measure)
        if (!decodedUrl.includes('joada.net') && !decodedUrl.includes('platforms5.joada.net')) {
            return res.status(403).json({ error: 'Only joada.net URLs are allowed' });
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
            return res.status(response.status).send(`Error: ${response.statusText}`);
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

        // Set appropriate headers
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        // Send the modified HTML
        res.send(modifiedHtml);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ 
            error: 'Proxy error', 
            message: error.message 
        });
    }
}

