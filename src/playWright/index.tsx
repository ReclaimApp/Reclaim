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
}

export default index
