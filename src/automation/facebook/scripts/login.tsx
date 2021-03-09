require('dotenv').config();
import writeDocument from "../../helperFunctions/writeFile"
import startHeadfullBrowser from "./startHeadfullBrowser"

async function login(credentialsPath) {
  /* start browser */
  const [browser, page] = await startHeadfullBrowser()

  try {

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
