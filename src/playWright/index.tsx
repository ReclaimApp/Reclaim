import goToDownloadYourInformation from './scripts/goToDownloadYourInformation'
import storeCredentials from './scripts/storeCredentials';
import askForFile from'./scripts/askForFiles';
import waitForFile from'./scripts/waitForFile';
import downloadFile from './scripts/downloadFile';
import setUpBrower from './scripts/setUpBrowser';
// const credentials = require('../credentials');

async function index() {
  /* save credentials enter by user */
  await storeCredentials();

  /* start browser */
  // const [browser, context] = await setUpBrower(JSON.stringify(credentials))
  const [browser, context] = await setUpBrower();

  try {
    /* select correct frame */
    const [page, dataDoc] = await goToDownloadYourInformation(context);

    /* ask for files */
    await askForFile(dataDoc);

    /* Wait for files */
    await waitForFile(page, dataDoc);

    /* Download files */
    await downloadFile(page);

    /* Close Automation */
    await browser.close();

  } catch (error) {
    /* handle the handless script breaking */
    console.log("the headless script broke")
    console.log(error)

    /* Close Automation */
    await browser.close();

  }

}

export default index
