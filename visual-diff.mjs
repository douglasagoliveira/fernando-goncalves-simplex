import { chromium } from 'playwright';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const routes = ['/', '/sobre', '/palestras', '/contato'];
const viewports = [
    { width: 320, height: 800 },
    { width: 375, height: 800 },
    { width: 768, height: 1024 },
    { width: 1024, height: 800 },
    { width: 1440, height: 900 },
    { width: 2560, height: 1440 }
];

const DEV_URL = 'http://localhost:4321';
const PREVIEW_URL = 'http://localhost:4322';

async function run() {
    console.log('Starting browsers...');
    const browser = await chromium.launch();
    
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    let discrepancies = [];

    for (const route of routes) {
        for (const vp of viewports) {
            console.log(`Testing ${route} at ${vp.width}x${vp.height}...`);
            const context = await browser.newContext({ viewport: vp });
            const page = await context.newPage();

            // DEV
            await page.goto(`${DEV_URL}${route}`, { waitUntil: 'networkidle' });
            await page.waitForFunction('document.fonts.status === "loaded"');
            // Disable animations
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.innerHTML = '* { transition: none !important; animation: none !important; }';
                document.head.appendChild(style);
            });
            await page.waitForTimeout(1000); // Wait a bit for layout to settle
            const devPath = `screenshots/dev-${route.replace('/', '') || 'home'}-${vp.width}.png`;
            await page.screenshot({ path: devPath, fullPage: true });

            // PREVIEW
            await page.goto(`${PREVIEW_URL}${route}`, { waitUntil: 'networkidle' });
            await page.waitForFunction('document.fonts.status === "loaded"');
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.innerHTML = '* { transition: none !important; animation: none !important; }';
                document.head.appendChild(style);
            });
            await page.waitForTimeout(1000);
            const previewPath = `screenshots/preview-${route.replace('/', '') || 'home'}-${vp.width}.png`;
            await page.screenshot({ path: previewPath, fullPage: true });

            await context.close();

            // Compare
            const img1 = PNG.sync.read(fs.readFileSync(devPath));
            const img2 = PNG.sync.read(fs.readFileSync(previewPath));
            
            // Adjust dimensions to match if they differ slightly
            const width = Math.min(img1.width, img2.width);
            const height = Math.min(img1.height, img2.height);
            
            const diff = new PNG({ width, height });

            let numDiffPixels = 0;
            try {
                numDiffPixels = pixelmatch(
                    img1.data, img2.data, diff.data, width, height, 
                    { threshold: 0.1 }
                );
            } catch (e) {
                console.error(`Error comparing ${route} at ${vp.width}:`, e.message);
            }

            if (numDiffPixels > 0) {
                const diffPath = `screenshots/diff-${route.replace('/', '') || 'home'}-${vp.width}.png`;
                fs.writeFileSync(diffPath, PNG.sync.write(diff));
                discrepancies.push({ route, viewport: vp.width, diffPixels: numDiffPixels });
                console.log(`-> Mismatch found! ${numDiffPixels} different pixels.`);
            } else {
                console.log(`-> Match.`);
            }
        }
    }

    await browser.close();
    
    console.log('--- Discrepancies ---');
    console.log(JSON.stringify(discrepancies, null, 2));
}

run().catch(console.error);
