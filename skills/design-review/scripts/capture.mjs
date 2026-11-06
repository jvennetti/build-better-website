// Design-review capture: full-page screenshots + mechanical checks.
// Usage: node capture.mjs <url> <output-dir>
// Requires: npm i -D playwright && npx playwright install chromium
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [url, outDir = 'design-review-out'] = process.argv.slice(2);
if (!url) {
  console.error('Usage: node capture.mjs <url> <output-dir>');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const report = { url, capturedAt: null, viewports: {}, links: [] };

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText ?? 'failed'})`);
    });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Scroll through the page so lazy content and scroll animations load,
    // then return to top for a clean screenshot.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: join(outDir, `${vp.name}-full.png`),
      fullPage: true,
    });

    const checks = await page.evaluate(() => {
      const overflowers = [];
      const docWidth = document.documentElement.clientWidth;
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width > 1 && (r.right > docWidth + 1 || r.left < -1)) {
          const tag = el.tagName.toLowerCase();
          const cls = typeof el.className === 'string' && el.className
            ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
            : '';
          overflowers.push(`${tag}${cls} (${Math.round(r.left)}..${Math.round(r.right)})`);
          if (overflowers.length >= 10) break;
        }
      }
      const badImages = [];
      for (const img of document.querySelectorAll('img')) {
        const issues = [];
        if (!img.getAttribute('alt')) issues.push('missing alt');
        if (img.naturalWidth && img.clientWidth) {
          const natural = img.naturalWidth / img.naturalHeight;
          const shown = img.clientWidth / img.clientHeight;
          if (Math.abs(natural - shown) > 0.05) issues.push('distorted aspect ratio');
        }
        if (issues.length) badImages.push(`${img.src.slice(0, 120)}: ${issues.join(', ')}`);
      }
      const h1Count = document.querySelectorAll('h1').length;
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.href);
      return {
        horizontalOverflow: document.documentElement.scrollWidth > docWidth + 1,
        overflowingElements: overflowers,
        badImages,
        h1Count,
        links: [...new Set(links)],
      };
    });

    report.viewports[vp.name] = {
      consoleErrors,
      failedRequests,
      horizontalOverflow: checks.horizontalOverflow,
      overflowingElements: checks.overflowingElements,
      badImages: checks.badImages,
      h1Count: checks.h1Count,
    };
    if (vp.name === 'desktop') report.links = checks.links;
    await context.close();
  }

  // Check every same-origin link's HTTP status from the desktop pass.
  const origin = new URL(url).origin;
  const linkChecks = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const href of report.links) {
    if (!href.startsWith(origin)) {
      linkChecks.push({ href, status: 'external (not checked)' });
      continue;
    }
    try {
      const resp = await page.request.get(href, { timeout: 10000 });
      linkChecks.push({ href, status: resp.status() });
    } catch (e) {
      linkChecks.push({ href, status: `error: ${e.message.slice(0, 80)}` });
    }
  }
  await context.close();
  report.links = linkChecks;
  report.capturedAt = new Date().toISOString();

  writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  const broken = linkChecks.filter((l) => typeof l.status === 'number' && l.status >= 400);
  console.log(`Captured ${VIEWPORTS.length} viewports to ${outDir}/`);
  console.log(`Broken links: ${broken.length}`);
  for (const vp of Object.keys(report.viewports)) {
    const r = report.viewports[vp];
    console.log(
      `${vp}: ${r.consoleErrors.length} console errors, ` +
      `overflow=${r.horizontalOverflow}, ${r.badImages.length} image issues`
    );
  }
  console.log(`Full details: ${join(outDir, 'report.json')}`);
} finally {
  await browser.close();
}
