require('dotenv').config();
import reattachFrame from './reattachFrame';
import startReportDownloadStatus from './startReportDownloadStatus';
import extract from "extract-zip"
import deleteZipFile from "./deleteZipFile";

const documentsPath = window.process.argv.slice(-1)[0];


async function downloadFile(page, browser, browserNotCloseCorrectly) {
  /* select child frame */
  // have to do this because after waiting for file to be ready by realoding the page the
  // old doc is detach from the page
  // like if it was a Interval ID
  const doc = await reattachFrame(page);

  /* Go to download option */
  // go to available copies to download the data
  const avaliableCopiesTab = 'li:last-child';
  // const avaliableCopiesTab = await page.waitForSelector("li:last-child")
  await doc.click(avaliableCopiesTab);

  // click download button
  console.log('Starting download');
  await doc.click('button[type=submit]');
  let download;
  try {
    download = await page.waitForEvent('download'); // wait for download to start
    await download.path();
  } catch (error) {
    // asked to reenter password
    console.log('Asked to reenter password');

    // retype password
    await doc.fill('input[type=password]', process.env.PASS);

    // submit password
    // await doc.click("td button[type=submit]")
    download = [download] = await Promise.all([
      page.waitForEvent('download'), // wait for download to start
      doc.click('td button[type=submit]'),
    ]);
  }

  /* setup console download reports and rename download file to recommended name */
  // download file with defaul name and no duplicates
  // custom file loader reports
  // design for downloading 1 complete file at a time
  let intervalID = [];

  page.on('download', async (download) => {
    /* wait for download file */
    // notice when the download starts
    console.log('going to start waiting for file');
    // start download reports
    intervalID.push(startReportDownloadStatus(download));
  });

  /* if the browser is close while the reports are going then close the reports */
  browser.on('disconnected', () => {
    // stop download report interval
    intervalID.forEach(id => {
      clearInterval(id);
    })
  })

  /* if the page times out say so and close the browser */
  page.on('requestfailed', async (request) => {
    console.log("the request has failed")
    // start a new request by going to the request url
    console.log("Going to start a new request")
    console.log("---This can break the script---")
    doc.goto(await request.url())
    console.log("Finish starting a new request")
  })

  /* save the download file has the suggested file name */
  // last report
  try {
    console.log ("check if the donwload has failed: " + await download.failure())
  } catch (error) {
    console.log("failure does not work")
  }

  const fileName = await download.suggestedFilename();
  const fileNamePath = `${documentsPath}/your_data/${fileName}`
  const facebookFile = await download.saveAs(fileNamePath);

  try {
    console.log("timing: " + await download.timing());
  } catch (error) {
    console.log("timing didn't work")
  }

  // stop download report interval
  intervalID.forEach(id => {
    clearInterval(id);
  })

  // report that downlolad is finished
  console.log(
    `Time ${Date().split(' ')[4]}: Finished ${fileName} file download. `
  );

  // delete the criptic file name
  await download.delete();

  // unzip the folder
  try {
    await extract(fileNamePath, { dir: `${documentsPath}/your_data/facebook` })
    console.log('Extraction complete')
  } catch (err) {
    // could not unzip
    console.log("Could not handle unzipping")
    console.log(err)
  }

  // delete the zip file
  try {
    console.log("Going to delete zip file")
    console.log(await facebookFile)
    deleteZipFile();

  } catch (error) {
    console.log("Could not delete zip file")
    console.log(error)

  }
  /* close browser */
  console.log('finished download');
}
// await page.evaluate(() => {debugger})

export default downloadFile;
