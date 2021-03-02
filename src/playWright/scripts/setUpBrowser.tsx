require('dotenv').config();
import { chromium } from 'playwright';

async function setUpBrower(storageState = process.env.STORAGE) {
  /* start headless browser with credentials */
  const browser = await chromium.launch({
    args: [
      '--start-maximized',
      '--disable-notifications',
      '--disable-extensions',
      '--mute-audio',
    ],
    defaultViewport: null,
    devtools: true,
    slowMo: 100,
    downloadsPath: 'D:\\Lambda\\projects\\puppeteer_test\\data',
  });

  // Create a new incognito browser context with user credentials
  console.log(storageState);
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null,
  });
  return [browser, context];
}
export default setUpBrower;
