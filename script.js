// Webcam data structure
// Webcams extracted from https://www.anglet-tourisme.com/webcams/
const webcams = [
    // DEBUGGING: Only Hossegor enabled for debugging
    /*
    {
        id: 1,
        name: "Plage de la Petite Chambre d'Amour",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/1922/Anglet-La-petit-chambre-d-amour",
        streamType: "iframe"
    },
    {
        id: 2,
        name: "Plage du Club",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/2126/Anglet-Plage-du-Club",
        streamType: "iframe"
    },
    {
        id: 3,
        name: "Plage des Sables d'Or",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/2128/Anglet-Plage-des-Sables-d-Or",
        streamType: "iframe"
    },
    {
        id: 4,
        name: "Plages des Sables d'Or, de Marinella et des Corsaires",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/2130/Anglet-Panoramique-Sables-d-Or-Marinella-Corsaires",
        streamType: "iframe"
    },
    {
        id: 5,
        name: "Plage de l'Océan",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/774/Anglet-Plage-de-l-Ocean",
        streamType: "iframe"
    },
    {
        id: 6,
        name: "Plage des Cavaliers",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/1994/Anglet-Plage-des-Cavaliers",
        streamType: "iframe"
    },
    {
        id: 7,
        name: "Plage de La Barre (et embouchure de l'Adour)",
        location: "Anglet",
        streamUrl: "https://pv.viewsurf.com/2134/Anglet-Plage-de-La-Barre-et-embouchure-de-l-Adour",
        streamType: "iframe"
    },
    */
    {
        id: 8,
        name: "Hossegor - La Centrale",
        location: "Hossegor",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=ed952023-5809-4800-3636-3230-6d61-63-8434-ef51ef1b3c2dd&type=vod&liveicon=0&vsheader=1&tz=Europe/Paris&tsp=1766928003&titletext=",
        streamType: "iframe"
    },
    /*
    {
        id: 9,
        name: "Biarritz - La Grande Plage",
        location: "Biarritz",
        streamUrl: "https://pv.viewsurf.com/2268/Biarritz-Grande-Plage-Quikislver?i=Nzk4NDp1bmRlZmluZWQ",
        streamType: "iframe"
    },
    {
        id: 10,
        name: "Seignosse - Plage du Penon",
        location: "Seignosse",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=8da4aff9-9afb-47ce-3937-3430-6d61-63-b10b-bae5e6dead40d&type=live&liveicon=1&vsheader=1&tz=Europe/Paris&tsp=1766387031&titletext=",
        streamType: "iframe"
    },
    {
        id: 11,
        name: "Seignosse - Plage des Estagnots",
        location: "Seignosse",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=9a61c3c0-c7be-4d68-3937-3430-6d61-63-87dc-96c2f900dc81d&type=vod&liveicon=0&vsheader=1&tz=Europe/Paris&tsp=1766923209&titletext=",
        streamType: "iframe"
    },
    {
        id: 12,
        name: "Seignosse - Plage des Bourdaines",
        location: "Seignosse",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=4824e7f0-6c78-48c6-3937-3430-6d61-63-85b2-90e219846b88d&type=vod&liveicon=0&vsheader=1&tz=Europe/Paris&tsp=1766925012&titletext=",
        streamType: "iframe"
    },
    {
        id: 13,
        name: "Seignosse - Plage du Penon (Live)",
        location: "Seignosse",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=0c5055bb-8a96-4c3c-3837-3430-6d61-63-943b-480da283f7bed&type=live&liveicon=1&vsheader=1&tz=Europe/Paris&tsp=1766387023&titletext=",
        streamType: "iframe"
    },
    {
        id: 14,
        name: "Seignosse - Général",
        location: "Seignosse",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=8da4aff9-9afb-47ce-3937-3430-6d61-63-b10b-bae5e6dead40d&type=live&liveicon=1&vsheader=1&tz=Europe/Paris&tsp=1766387031&titletext=",
        streamType: "iframe"
    },
    {
        id: 15,
        name: "Saint Jean de Luz - Sainte Barbe",
        location: "Saint Jean de Luz",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=5c6c4cdb-a774-4da4-3533-3430-6d61-63-b749-ba239a7f9e53d&type=vod&liveicon=0&vsheader=1&tz=Europe/Paris&tsp=1766926809&titletext=",
        streamType: "iframe"
    },
    {
        id: 16,
        name: "Biarritz - Côte des Basques",
        location: "Biarritz",
        streamUrl: "https://platforms5.joada.net/embeded/embeded.html?uuid=4ec957fc-fea2-49f2-3530-3130-6d61-63-872c-0869d3d9cef1d&type=live&liveicon=1&vsheader=1&tz=Europe/Paris&tsp=1766387031&titletext=",
        streamType: "iframe"
    }
    */
];

// Configuration: Proxy settings for joada.net URLs (bypasses 403 errors when hosted)
// Set PROXY_ENABLED to true and PROXY_BASE_URL to your proxy endpoint
// Examples:
//   - Local development: 'http://localhost:3000/api/proxy'
//   - Netlify: 'https://your-site.netlify.app/.netlify/functions/proxy'
//   - Vercel: 'https://your-site.vercel.app/api/proxy'
const PROXY_ENABLED = true; // Set to true to enable proxy
// Auto-detect environment: use local proxy for localhost, Netlify proxy for production
const PROXY_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/proxy'
    : 'https://magnificent-beignet-e92358.netlify.app/.netlify/functions/proxy'; // Your proxy endpoint URL (without trailing slash)

// Initialize the webcam grid when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update timestamps in URLs that have them (to ensure they're current)
    // TEMPORARILY DISABLED - uncomment to re-enable
    // updateUrlTimestamps();
    renderWebcamGrid();
});

/**
 * Updates timestamps in webcam URLs to ensure they're current
 * This helps prevent expired embed URLs
 */
function updateUrlTimestamps() {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    webcams.forEach(webcam => {
        if (webcam.streamUrl && webcam.streamUrl.includes('tsp=')) {
            // Update the timestamp parameter in the URL
            webcam.streamUrl = webcam.streamUrl.replace(/tsp=\d+/, `tsp=${currentTimestamp}`);
        }
    });
}

/**
 * Wraps a URL with the backend proxy if enabled and needed
 * @param {string} url - Original URL
 * @returns {string} - URL with proxy if needed
 */
function wrapUrlWithProxy(url) {
    // Only proxy joada.net URLs if proxy is enabled
    if (PROXY_ENABLED && PROXY_BASE_URL && (url.includes('joada.net') || url.includes('platforms5.joada.net'))) {
        return `${PROXY_BASE_URL}?url=${encodeURIComponent(url)}`;
    }
    return url;
}

/**
 * Renders all webcams in the grid
 */
function renderWebcamGrid() {
    const grid = document.getElementById('webcam-grid');
    
    if (!grid) {
        console.error('Webcam grid container not found');
        return;
    }

    // Clear existing content
    grid.innerHTML = '';

    if (webcams.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p style="font-size: 1.2rem; color: #666; margin-bottom: 1rem;">Aucune webcam configurée</p>
                <p style="color: #999;">Consultez le README.md pour savoir comment ajouter des webcams.</p>
            </div>
        `;
        return;
    }

    // Create a card for each webcam
    webcams.forEach(webcam => {
        const card = createWebcamCard(webcam);
        grid.appendChild(card);
    });
}

/**
 * Creates a webcam card element
 * @param {Object} webcam - Webcam data object
 * @returns {HTMLElement} - The created card element
 */
function createWebcamCard(webcam) {
    const card = document.createElement('div');
    card.className = 'webcam-card';
    card.setAttribute('data-webcam-id', webcam.id);

    // Card header with title and location
    const header = document.createElement('div');
    header.className = 'webcam-header';
    header.innerHTML = `
        <div class="webcam-title">${escapeHtml(webcam.name)}</div>
        <div class="webcam-location">${escapeHtml(webcam.location)}</div>
    `;

    // Card content with stream
    const content = document.createElement('div');
    content.className = 'webcam-content';
    
    // Add loading state initially
    const loading = document.createElement('div');
    loading.className = 'webcam-loading';
    loading.innerHTML = `
        <div class="spinner"></div>
        <div>Chargement...</div>
    `;
    content.appendChild(loading);

    // Create stream element based on type
    const streamElement = createStreamElement(webcam);
    if (streamElement) {
        // Hide loading when stream loads
        streamElement.addEventListener('load', () => {
            loading.style.display = 'none';
        });
        streamElement.addEventListener('error', () => {
            loading.style.display = 'none';
            showStreamError(content, webcam);
        });
        
        // For video elements, use different events
        if (streamElement.tagName === 'VIDEO') {
            streamElement.addEventListener('loadeddata', () => {
                loading.style.display = 'none';
            });
            streamElement.addEventListener('error', () => {
                loading.style.display = 'none';
                showStreamError(content, webcam);
            });
        }

        content.appendChild(streamElement);
    } else {
        loading.style.display = 'none';
        showStreamError(content, webcam);
    }

    // Assemble card
    card.appendChild(header);
    card.appendChild(content);

    return card;
}

/**
 * Creates the appropriate stream element based on webcam type
 * @param {Object} webcam - Webcam data object
 * @returns {HTMLElement|null} - The stream element or null if invalid
 */
function createStreamElement(webcam) {
    if (!webcam.streamUrl || !webcam.streamType) {
        console.warn(`Invalid webcam data for ${webcam.name}: missing streamUrl or streamType`);
        return null;
    }

    switch (webcam.streamType.toLowerCase()) {
        case 'iframe':
            return createIframeStream(webcam.streamUrl);
        
        case 'video':
            return createVideoStream(webcam.streamUrl);
        
        case 'youtube':
            return createYouTubeStream(webcam.streamUrl);
        
        default:
            console.warn(`Unknown stream type: ${webcam.streamType} for ${webcam.name}`);
            return createIframeStream(webcam.streamUrl); // Default to iframe
    }
}

/**
 * Creates an iframe element for streaming
 * @param {string} url - Stream URL
 * @returns {HTMLIFrameElement} - The iframe element
 */
function createIframeStream(url) {
    const iframe = document.createElement('iframe');
    iframe.className = 'webcam-iframe';
    
    // Apply proxy if configured and needed
    const finalUrl = wrapUrlWithProxy(url);
    iframe.src = finalUrl;
    
    iframe.allowFullscreen = true;
    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media');
    iframe.setAttribute('loading', 'lazy');
    
    // Try to bypass referrer restrictions for joada.net URLs
    // Note: This may not work if the server strictly checks referrers
    if (url.includes('joada.net') || url.includes('platforms5.joada.net')) {
        // Set referrer policy to try to bypass referrer checks
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    }
    
    return iframe;
}

/**
 * Creates a video element for direct video streaming
 * @param {string} url - Video stream URL
 * @returns {HTMLVideoElement} - The video element
 */
function createVideoStream(url) {
    const video = document.createElement('video');
    video.className = 'webcam-video';
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.muted = true; // Required for autoplay in most browsers
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    return video;
}

/**
 * Creates a YouTube embed iframe
 * @param {string} url - YouTube URL or video ID
 * @returns {HTMLIFrameElement} - The YouTube iframe
 */
function createYouTubeStream(url) {
    // Extract video ID from various YouTube URL formats
    let videoId = url;
    
    // Handle full YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
        videoId = match[1];
    }
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    return createIframeStream(embedUrl);
}

/**
 * Shows an error message when stream fails to load
 * @param {HTMLElement} container - The container element
 * @param {Object} webcam - Webcam data object
 */
function showStreamError(container, webcam) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'webcam-error';
    errorDiv.innerHTML = `
        <div class="webcam-error-icon">⚠️</div>
        <div class="webcam-error-message">
            Impossible de charger le flux<br>
            <small>${escapeHtml(webcam.name)}</small>
        </div>
    `;
    
    // Remove existing error if any
    const existingError = container.querySelector('.webcam-error');
    if (existingError) {
        existingError.remove();
    }
    
    container.appendChild(errorDiv);
}

/**
 * Escapes HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Refreshes a specific webcam stream
 * @param {number} webcamId - ID of the webcam to refresh
 */
function refreshWebcam(webcamId) {
    const card = document.querySelector(`[data-webcam-id="${webcamId}"]`);
    if (!card) {
        console.warn(`Webcam with ID ${webcamId} not found`);
        return;
    }

    const content = card.querySelector('.webcam-content');
    const webcam = webcams.find(w => w.id === webcamId);
    
    if (!webcam) {
        console.warn(`Webcam data not found for ID ${webcamId}`);
        return;
    }

    // Clear content
    content.innerHTML = '';
    
    // Show loading
    const loading = document.createElement('div');
    loading.className = 'webcam-loading';
    loading.innerHTML = `
        <div class="spinner"></div>
        <div>Rechargement...</div>
    `;
    content.appendChild(loading);

    // Recreate stream
    const streamElement = createStreamElement(webcam);
    if (streamElement) {
        streamElement.addEventListener('load', () => {
            loading.style.display = 'none';
        });
        streamElement.addEventListener('error', () => {
            loading.style.display = 'none';
            showStreamError(content, webcam);
        });
        
        if (streamElement.tagName === 'VIDEO') {
            streamElement.addEventListener('loadeddata', () => {
                loading.style.display = 'none';
            });
            streamElement.addEventListener('error', () => {
                loading.style.display = 'none';
                showStreamError(content, webcam);
            });
        }

        content.appendChild(streamElement);
    } else {
        loading.style.display = 'none';
        showStreamError(content, webcam);
    }
}

/**
 * Refreshes all webcam streams
 */
function refreshAllWebcams() {
    webcams.forEach(webcam => {
        refreshWebcam(webcam.id);
    });
}

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderWebcamGrid,
        refreshWebcam,
        refreshAllWebcams
    };
}

