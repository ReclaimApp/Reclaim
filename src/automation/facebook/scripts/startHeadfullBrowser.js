import { chromium } from 'playwright';
import getCredentials from "./getCredentials"
const startHeadfullBrowser = async (props) => {
  const {isRunWithCredentials, absoluteCredentialsPath} = props

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
  let context
  if(isRunWithCredentials){
    debugger
    //get the credential data
    const storageState = await getCredentials(absoluteCredentialsPath)

    // apply the cookies to the browser
    context = await browser.newContext({
      viewport: null,
      storageState: JSON.parse(storageState),
      acceptDownloads: true,
    });
  }
  else{
    debugger
    context = await browser.newContext({
      viewport: null,
    });
  }

  // Create a new page in a pristine context.
  const page = await context.newPage();

  return {browser, context, page}
}

export default startHeadfullBrowser
