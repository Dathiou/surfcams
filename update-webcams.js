#!/usr/bin/env node

/**
 * Helper script to update webcam embed URLs
 * Run this script periodically to get the latest embed URLs
 * 
 * Usage: node update-webcams.js
 */

const https = require('https');
const { execSync } = require('child_process');

// Webcam sources to check
const webcamSources = {
    'Hossegor - La Centrale': {
        url: 'https://viewsurf.com/univers/surf/vue/2058-france-aquitaine-soorts-hossegor-plage',
        extractPattern: /https:\/\/platforms5\.joada\.net\/embeded\/embeded\.html\?uuid=[^"&]+/g
    },
    'Biarritz - Côte des Basques': {
        url: 'https://quiksilver.fr/surf/webcams/biarritz-cote-des-basques.html',
        extractPattern: /uuid\s*=\s*'([^']+)'/g
    }
    // Add more sources as needed
};

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function getLatestEmbedUrl(name, source) {
    try {
        console.log(`\nFetching latest URL for: ${name}...`);
        const html = await fetchUrl(source.url);
        
        if (source.extractPattern) {
            const matches = html.match(source.extractPattern);
            if (matches && matches.length > 0) {
                let url = matches[0];
                // For Biarritz, we need to construct the full URL
                if (name.includes('Côte des Basques')) {
                    const uuidMatch = html.match(/uuid\s*=\s*'([^']+)'/);
                    if (uuidMatch) {
                        const uuid = uuidMatch[1];
                        const timestamp = Math.floor(Date.now() / 1000);
                        url = `https://platforms5.joada.net/embeded/embeded.html?uuid=${uuid}&type=live&liveicon=1&vsheader=1&tz=Europe/Paris&tsp=${timestamp}&titletext=`;
                    }
                }
                console.log(`✓ Found: ${url.substring(0, 80)}...`);
                return url;
            }
        }
        console.log(`✗ No embed URL found`);
        return null;
    } catch (error) {
        console.log(`✗ Error: ${error.message}`);
        return null;
    }
}

async function updateWebcams() {
    console.log('🔍 Checking for updated webcam URLs...\n');
    
    const updates = {};
    
    for (const [name, source] of Object.entries(webcamSources)) {
        const latestUrl = await getLatestEmbedUrl(name, source);
        if (latestUrl) {
            updates[name] = latestUrl;
        }
    }
    
    if (Object.keys(updates).length > 0) {
        console.log('\n📋 Latest URLs found:');
        console.log('='.repeat(80));
        for (const [name, url] of Object.entries(updates)) {
            console.log(`\n${name}:`);
            console.log(url);
        }
        console.log('\n' + '='.repeat(80));
        console.log('\n💡 Copy these URLs and update them in script.js manually.');
        console.log('   Or use a text editor to find and replace the old URLs.');
    } else {
        console.log('\n⚠️  No updates found. URLs may still be valid.');
    }
}

// Run the update
updateWebcams().catch(console.error);

