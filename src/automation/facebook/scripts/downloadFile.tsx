require('dotenv').config();
import extract from "extract-zip"
import deleteZipFile from "./deleteZipFile";
import reportDownloadFile from "./reportDownloadFile"
import startDownload from "./startDownload"
import { normalize } from 'path'

async function downloadFile(props) {
  const {page, documentsPath, absoluteCredentialsPath, browser} = props

  /* start download */
  const {doc, download, isDownloadStarted} = await startDownload({page, absoluteCredentialsPath})
  console.log({doc, download, isDownloadStarted})
  /* start report for downloading file */
  //todo: Console log does not work on productions. need to something else like notification or GUI visual.
  const fileName = await download.suggestedFilename();
  const fileNamePath = normalize(`${__dirname}/user_data/${fileName}`)
  await reportDownloadFile({page, doc, download, fileName, browser})

  if(isDownloadStarted){
    /*wait for file to completly download */
    await download.path();

    //Make file name readable
    debugger
    const facebookFile = await download.saveAs(fileNamePath);


    // delete the criptic file name
    await download.delete();

    /* unzip the folder */
    try {
      await extract(fileNamePath, { dir: `${documentsPath}/your_data/facebook` })
      console.log('Extraction complete')
    } catch (err) {
      // could not unzip
      console.log("Could not handle unzipping")
      console.log(err)
    }

    /* delete the zip file */
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
  else console.log("Donwload didn't start")
}

export default downloadFile;
