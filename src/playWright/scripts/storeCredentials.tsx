require('dotenv').config();
import { chromium } from 'playwright';

async function login() {
  /* start browser */
  const browser = await chromium.launch({
    args: [
      '--start-maximized',
      '--disable-notifications',
      '--disable-extensions',
      '--mute-audio',
    ],
    defaultViewport: null,
    headless: false,
    downloadsPath: 'D:\\Lambda\\projects\\puppeteer_test\\data',
  });
  // Create a new incognito browser context.
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null,
  });
  // Create a new page in a pristine context.
  const page = await context.newPage();

  /* Authentication */
  await page.goto(
    'https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings'
  );

  // Interact with login form
  await page.fill('#email', process.env.ID || "No Id");
  await page.fill('#pass', process.env.PASS || "No password");
  await page.click('[type=submit]');
  // wait for login
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  // Save storage state and store as an env variable
  const storage = await context.storageState();
  process.env.STORAGE = JSON.stringify(storage);

  // close headfull browser
  await browser.close();
}
export default login;
