const fs = require('fs');
const path = require('path');

// 1. Copy the favicon to the root
const sourceFavicon = path.join('HOME _ My Site_files', 'Pink Poppy Flowers.png');
const targetFavicon = 'favicon.png';

if (fs.existsSync(sourceFavicon)) {
    fs.copyFileSync(sourceFavicon, targetFavicon);
    console.log("Favicon copied to root.");
} else {
    console.log("Source favicon not found!");
    process.exit(1);
}

// 2. Inject into all HTML files in root
const files = fs.readdirSync(__dirname);
const htmlFiles = files.filter(f => f.endsWith('.html'));

const faviconTag = '\n    <link rel="icon" type="image/png" href="favicon.png">';

let updatedCount = 0;
htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Check if there is an existing favicon link and remove it to avoid duplicates
    // Wix usually puts <link rel="icon" ...> or <link rel="shortcut icon" ...>
    html = html.replace(/<link[^>]*rel=["'](shortcut )?icon["'][^>]*>/gi, '');
    
    // Inject the new favicon right before </head>
    if (html.includes('</head>')) {
        html = html.replace('</head>', faviconTag + '\n</head>');
        fs.writeFileSync(file, html);
        updatedCount++;
    }
});

console.log(`Injected favicon into ${updatedCount} HTML files.`);
