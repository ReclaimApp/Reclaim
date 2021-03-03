import storeCredentials from './scripts/storeCredentials';
import goToDownloadFile from './scripts/goToDownloadFile'
import askForFile from'./scripts/askForFiles';
import waitForFile from'./scripts/waitForFile';
import downloadFile from './scripts/downloadFile';
import setUpBrower from './scripts/setUpBrowser';
import credentials from "../../user_data/credentials/facebook"

async function index(isSaveNewCredentials = false) {
  /* check if there is credentials */
  console.log(credentials)
  const isNoCredentialsExist = credentials ?  false : true
  const isCredentialsExist = !isNoCredentialsExist
  console.log(isNoCredentialsExist)

  /* save credentials enter by user */
  if(isNoCredentialsExist){
    await storeCredentials(isSaveNewCredentials);
  }

  /* start browser */
  const storage = isCredentialsExist ? JSON.stringify(credentials) : process.env.STORAGE
  const [browser, context] = await setUpBrower(storage);

  try {
    /* select correct frame */
    const [page, dataDoc] = await goToDownloadFile(context);

    // /* ask for files */
    // await askForFile(dataDoc);

    // /* Wait for files */
    // await waitForFile(page, dataDoc);

    /* Download files */
    await downloadFile(page, browser);

    /* unzip file and delete zip file */

    /* Close Automation */
    await browser.close();

  } catch (error) {
    /* handle the handless script breaking */
    console.log("the headless script broke")
    console.log(error)

    /* Close Automation */
    // await browser.close();

  }

}

export default index
