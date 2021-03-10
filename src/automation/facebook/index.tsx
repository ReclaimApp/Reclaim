import goToDownloadFile from './scripts/goToDownloadFile'
import askForFile from'./scripts/askForFiles'
import waitForFile from'./scripts/waitForFile'
import downloadFile from './scripts/downloadFile'
import setUpBrower from './scripts/setUpBrowser'
import { normalize } from 'path'
import getCredentials from "./scripts/getCredentials"

async function index(
  downloadPath = normalize(`${__dirname}/user_data/facebook`),
  ) {
  const documentsPath = window.process.argv.slice(-1)[0]

  /* get credentials */
  // get user account access
  const credentialsFile = await getCredentials()
  console.log({credentialsFile})

  const isThereCrendtialsFile = credentialsFile === null ? false : true
  if(isThereCrendtialsFile){
    // run the scrip if there is login file/cookies
    try {
      /* start browser */
      const [browser, context] = await setUpBrower(credentialsFile, downloadPath)

      /* select correct frame */
      const [page, dataDoc] = await goToDownloadFile(context)

      // /* ask for files */
      // await askForFile(dataDoc)

      // /* Wait for files */
      // await waitForFile(page, dataDoc)

      /* Download files */
      await downloadFile(page, browser, documentsPath)

      /* unzip file and delete zip file */

      /* Close Automation */
      await browser.close()

    } catch (error) {
      /* handle the handless script breaking */
      console.log("the headless script broke")
      console.log(error)

      /* Close Automation */
      // await browser.close()

    }
  } else{
    // don't run the script when the user closes the headful login to capture their credentials
    console.log("Didn't ran the script")
  }


}

export default index
