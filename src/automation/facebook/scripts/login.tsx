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

    /* go to facebook login */
    await page.goto(
      'https://www.facebook.com/login'
    );
    console.log("going to wait for request")

    //Todo: what the option to capture the user id and password for later credential reentering
    /*
      capture client response id and pass
      there should be a request from client with the id and password

      capture that and save it for later use

      close browser when:
      - close the browser after reseving the credentials response
      - cookies are populated

      the desire cookies from facebook are
      - c_user: number
      - xs: encripted string

    */
    //caputure the request data

    //wait until user cloes browser
    await page.waitForNavigation({timeout: 0, url:"https://www.facebook.com/"});

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
