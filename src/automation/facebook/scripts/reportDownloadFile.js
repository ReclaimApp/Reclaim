import startReportDownloadStatus from './startReportDownloadStatus';

const reportDownloadFile = async (props) => {
  const {page, doc, download, fileName, browser} = props
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

  }

  export default reportDownloadFile
