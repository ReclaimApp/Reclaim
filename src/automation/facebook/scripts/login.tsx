require('dotenv').config();
import writeDocument from "../../helperFunctions/writeFile"
import startHeadfullBrowser from "./startHeadfullBrowser"

async function login(credentialsPath) {
  /* start browser */
  console.log('line 7 login')
  const {browser, context, page} = await startHeadfullBrowser()
  console.log('line 9 login')
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
