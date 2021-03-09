require('dotenv').config();
import { chromium } from 'playwright';
import writeDocument from "../../helperFunctions/writeFile"

async function login(credentialsPath) {
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
  });

  try {
    // Create a new incognito browser context.
    const context = await browser.newContext({
      viewport: null,
    });
    // Create a new page in a pristine context.
    const page = await context.newPage();

    /* Authentication */
    await page.goto(
      'https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings'
    );
    console.log("going to wait for request")

    // capture the id and password for later enter of credentials
    // request.postDataJSON()

    // wait for until the user closes the window
    // gives enough time for filling extra audentication
    await page.waitForEvent('close', {timeout: 0});

    /* save facebook credentials */
    const storageData = await context.storageState();
    console.log({storageData})

    // create credential file
    await writeDocument(credentialsPath, JSON.stringify(storageData))

    // close headfull browser
    await browser.close();

  } catch (error) {
    console.log("Something when wrong when login in")
    console.log(error)

    // close headfull browser
    await browser.close();
  }

}
export default login;
