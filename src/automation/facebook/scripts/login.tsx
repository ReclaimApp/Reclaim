require('dotenv').config();
import writeDocument from "../../helperFunctions/writeFile"
import startHeadfullBrowser from "./startHeadfullBrowser"

async function login(credentialsPath) {
  /* start browser */
  const {browser, context, page} = await startHeadfullBrowser()

  /* go to facebook login */
  await page.goto('https://www.facebook.com/login');
  console.log("going to wait for request")

  try {
    //wait until user cloes browser
    await page.waitForNavigation({timeout: 0,url:"https://www.facebook.com/",
    });

    /* save facebook credentials */
    const storageData = await context.storageState();
    console.log({storageData})

    // create credential file
    await writeDocument(credentialsPath, JSON.stringify(storageData))

  } catch (error) {
    console.log("The user close the login window")
    console.log(error)
  }

  // close headfull browser
  await browser.close();
}
export default login;
