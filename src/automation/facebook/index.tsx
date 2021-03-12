import goToDownloadFile from './scripts/goToDownloadFile'
import askForFile from'./scripts/askForFiles'
import waitForFile from'./scripts/waitForFile'
import downloadFile from './scripts/downloadFile'
import setUpBrower from './scripts/setUpBrowser'
import { normalize } from 'path'

async function index(
  downloadPath = normalize(`${__dirname}/user_data/facebook`),
  ) {
  const absoluteCredentialsPath = normalize(`${__dirname}/user_data/credentials/facebookCredentials.js`)
  const documentsPath = window.process.argv.slice(-1)[0]

  /* start browser */
  // if the browser cannot start then don't run the script
  const {browser, context, isRunScript: isNoRunScript} = await setUpBrower({downloadPath, absoluteCredentialsPath})

  if(isNoRunScript){
    try {

      /* select correct frame */
      const [page, dataDoc] = await goToDownloadFile({context, absoluteCredentialsPath})

      // /* ask for files */
      await askForFile(dataDoc)

      // /* Wait for files */
      await waitForFile(page, dataDoc)

      /* Download files */
      await downloadFile({page, documentsPath, absoluteCredentialsPath, browser})

      /* Close Automation */
      await browser.close()

    } catch (error) {
      /* handle the handless script breaking */
      console.log("the headless script broke")
      console.log(error)

      /* Close Automation */
      await browser.close()

    }
  } else{
    // don't run the script when the user closes the headful login to capture their credentials
    console.log("Didn't ran the script")
  }


}

export default index
