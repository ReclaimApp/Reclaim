require('dotenv').config();
import { chromium } from 'playwright';
import dataDir from "./dataDir"

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
    downloadsPath: dataDir("facebook"),
  });
  console.log(dataDir("facebook"))
  // Create a new incognito browser context with user credentials
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null,
    storageState: JSON.parse(storageState),
  });
  return [browser, context];
}
export default setUpBrower;
