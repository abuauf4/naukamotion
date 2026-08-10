// Screenshot script for V2 visual QA — corrected timing
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { width: 360, height: 800, name: 'mobile-360' },
    { width: 390, height: 844, name: 'mobile-390' },
    { width: 430, height: 932, name: 'mobile-430' },
    { width: 1440, height: 900, name: 'desktop-1440' },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    // Block sessionStorage so opening plays each time
    await page.addInitScript(() => {
      try { sessionStorage.clear(); } catch (e) {}
    });
    console.log(`Capturing ${vp.name}...`);

    // Capture mid-opening (at 600ms — letters are mid-reveal)
    await page.goto('http://127.0.0.1:3132/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `/home/z/my-project/download/v2-${vp.name}-00-opening-mid.png`,
      fullPage: false,
    });

    // Capture at 900ms — opening letters fully revealed, "Motion" appears
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `/home/z/my-project/download/v2-${vp.name}-01-opening-late.png`,
      fullPage: false,
    });

    // Wait for opening to fully finish + hero mask reveal
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `/home/z/my-project/download/v2-${vp.name}-02-hero.png`,
      fullPage: false,
    });

    // Capture full page after reload (opening skipped via sessionStorage)
    await page.evaluate(() => {
      try { sessionStorage.setItem('nauka-opening-played', '1'); } catch (e) {}
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `/home/z/my-project/download/v2-${vp.name}-03-fullpage.png`,
      fullPage: true,
    });

    await context.close();
  }

  await browser.close();
  console.log('Screenshots complete.');
})().catch(e => {
  console.error('Screenshot error:', e);
  process.exit(1);
});
