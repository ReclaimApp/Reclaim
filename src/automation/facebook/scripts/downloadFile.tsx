require('dotenv').config();
import reattachFrame from './reattachFrame';
import startReportDownloadStatus from './startReportDownloadStatus';

async function downloadFile(page) {
  /* select child frame */
  // have to do this because after waiting for file to be ready by realoding the page the
  // old doc is detach from the page
  // like if it was a Interval ID
  const doc = await reattachFrame(page);

  /* setup console download reports and rename download file to recommended name */

  // download file with defaul name and no duplicates
  // custom file loader reports
  // design for downloading 1 complete file at a time
  let intervalID;

  page.on('download', async (download) => {
    /* wait for download file */
    // notice when the download starts
    console.log('going to start waiting for file');
    // start download reports
    intervalID = startReportDownloadStatus(download);
  });

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

  // save the download file has the suggested file name
  // last report
  const fileName = await download.suggestedFilename();
  await download.saveAs(`./data/${fileName}`);

  // stop download report interval
  clearInterval(intervalID);

  // report that downlolad is finished
  console.log(
    `Time ${Date().split(' ')[4]}: Finished ${fileName} file download. `
  );

  // delete the criptic file name
  await download.delete();

  /* close browser */
  console.log('finished download');
}
// await page.evaluate(() => {debugger})

export default downloadFile;
