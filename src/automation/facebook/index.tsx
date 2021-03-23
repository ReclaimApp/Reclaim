import goToDownloadFile from './scripts/goToDownloadFile';
import askForFile from './scripts/askForFiles';
import waitForFile from './scripts/waitForFile';
import downloadFile from './scripts/downloadFile';
import setUpBrower from './scripts/setUpBrowser';
import { normalize } from 'path';
import store from '../../store/store';
import { GET_DATA_STATUS } from '../../store/Actions';

async function index(
  downloadPath: string = normalize(`${__dirname}/user_data/facebook`)
) {
  const absoluteCredentialsPath: string = normalize(
    `${__dirname}/user_data/credentials/facebookCredentials.js`
  );
  const documentsPath: string = window.process.argv.slice(-1)[0];

  /* start browser
  { browser: ChromiumBrowser | undefined, context: ChromiumBrowserContext | undefined, isRunScript: boolean }

  */
  // if the browser cannot start then don't run the script
  const { browser, context, isRunScript: isNoRunScript } = await setUpBrower({
    downloadPath,
    absoluteCredentialsPath,
  });

  if (isNoRunScript) {
    try {
      /* select correct frame */
      store.dispatch({ type: GET_DATA_STATUS, payload: 'Navigating Facebook' });
      const [page, dataDoc] = await goToDownloadFile({
        context,
        absoluteCredentialsPath,
      });

      // /* ask for files */
      store.dispatch({
        type: GET_DATA_STATUS,
        payload: 'Asking Facebook to create data file',
      });
      const {
        isNeedtoWaitForFile,
      }: { isNeedtoWaitForFile: boolean } = await askForFile(dataDoc, page);
      if (isNeedtoWaitForFile) {
        // /* Wait for files */
        store.dispatch({
          type: GET_DATA_STATUS,
          payload:
            'Waiting for Facebook to create your data file (this could take a while)',
        });
        await waitForFile(page, dataDoc);
      }
      /* Download files */
      // notify user that the download option is starting
      store.dispatch({
        type: GET_DATA_STATUS,
        payload: 'Downloading your data file',
      });
      // start downlading
      await downloadFile({
        page,
        documentsPath,
        absoluteCredentialsPath,
        browser,
      });

      /* Close Automation */
      await browser.close();
    } catch (error) {
      /* handle the handless script breaking */
      console.log('the headless script broke');
      store.dispatch({
        type: GET_DATA_STATUS,
        payload: 'There was an error and the automatic reclaim script broke',
      });
      console.log(error);

      /* Close Automation */
      await browser.close();
      store.dispatch({
        type: GET_DATA_STATUS,
        payload:
          'The automatic reclaim process for Facebook has completed succesfully',
      });
      return new Notification('Reclaiming', {
        body:
          'The automatic reclaim process for Facebook has completed succesfully',
      });
    }
  } else {
    // don't run the script when the user closes the headful login to capture their credentials
    console.log("Didn't run the script");
  }
}

export default index;
