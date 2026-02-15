const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to banner dimensions
    await page.setViewport({
        width: 1584,
        height: 396,
        deviceScaleFactor: 2 // Higher quality
    });
    
    // Load the HTML file
    const filePath = path.join(__dirname, 'linkedin-banner.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    
    // Find the banner element and screenshot just that
    const banner = await page.$('.banner');
    
    if (banner) {
        await banner.screenshot({
            path: 'linkedin-banner.png',
            type: 'png'
        });
        console.log('✅ Banner saved as linkedin-banner.png (1584x396 @ 2x resolution)');
    } else {
        console.log('❌ Could not find .banner element');
    }
    
    await browser.close();
})();
