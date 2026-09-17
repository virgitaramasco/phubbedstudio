const fs = require('fs');
const files = fs.readdirSync(__dirname);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let updatedCount = 0;
htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove apple-touch-icon and mask-icon containing Wix favicon
    let originalHtml = html;
    html = html.replace(/<link[^>]*rel=["']apple-touch-icon["'][^>]*>/gi, '');
    html = html.replace(/<link[^>]*rel=["']mask-icon["'][^>]*>/gi, '');
    
    if (originalHtml !== html) {
        fs.writeFileSync(file, html);
        updatedCount++;
    }
});

console.log(`Cleaned up Wix favicon references in ${updatedCount} HTML files.`);
