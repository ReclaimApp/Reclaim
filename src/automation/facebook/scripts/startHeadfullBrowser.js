import { chromium } from 'playwright';

const startHeadfullBrowser = async () => {
    const browser = await chromium.launch({
    args: [
      '--start-maximized',
      '--disable-notifications',
      '--disable-extensions',
      '--mute-audio',
    ],
    defaultViewport: null,
    headless: false,
  });
  // Create a new incognito browser context.
    const context = await browser.newContext({
      viewport: null,
    });
    // Create a new page in a pristine context.
    const page = await context.newPage();

    return {browser, context, page}
  }

  export default startHeadfullBrowser
