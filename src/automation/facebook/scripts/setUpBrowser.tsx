require('dotenv').config();
import { chromium } from 'playwright';

async function setUpBrower(storageState) {
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
    downloadsPath: "D:\\Documents\\SelfExploreApp\\user_data\\facebook",
  });
  // Create a new incognito browser context with user credentials
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null,
    storageState: JSON.parse(storageState),
  });
  return [browser, context];
}
export default setUpBrower;
