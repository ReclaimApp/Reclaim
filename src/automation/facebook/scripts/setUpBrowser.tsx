require('dotenv').config();
import { chromium } from 'playwright';
import getCredentials from "./getCredentials"

async function setUpBrower(props) {
  const {downloadPath, absoluteCredentialsPath} = props
  /* get credentials */
  // get user account access
  const storageState = await getCredentials(absoluteCredentialsPath)
  console.log({storageState})

  const isThereCrendtialsFile = storageState === null ? false : true

  if(isThereCrendtialsFile){
    // run the scrip if there is login file/cookies
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
      downloadsPath: downloadPath,

    });

    // Create a new incognito browser context with user credentials
    const context = await browser.newContext({
      acceptDownloads: true,
      viewport: null,
      storageState: JSON.parse(storageState),
    });

    return {browser, context, isRunScript: true};
  }
  else {
    return {isRunScript: false}
  }
}
export default setUpBrower;
