require('dotenv').config();
import React from 'react';
import extract from "extract-zip"
import deleteZipFile from "./deleteZipFile";
import reportDownloadFile from "./reportDownloadFile"
import startDownload from "./startDownload"
import { normalize } from 'path'
import {GET_DATA_STATUS} from "../../../store/Actions";
import {useDispatch} from 'react-redux';

async function downloadFile(props) {
  const dispatch = useDispatch();
  const {page, documentsPath, absoluteCredentialsPath, browser} = props

  /* start download */
  const {doc, download, isDownloadStarted} = await startDownload({page, absoluteCredentialsPath})
  console.log({doc, download, isDownloadStarted})

  if(isDownloadStarted){
    /* download file */
    await download.path();
    const fileName = await download.suggestedFilename();
    const fileNamePath = normalize(`${__dirname}/user_data/${fileName}`)

    //Make file name readable
    debugger
    const facebookFile = await download.saveAs(fileNamePath);
    /* start report for downloading file */
    //todo: Console log does not work on productions. need to something else like notification or GUI visual.
    await reportDownloadFile({page, doc, download, fileName, browser})

    // delete the criptic file name
    await download.delete();

    /* unzip the folder */
    try {
      // Update data status
      dispatch({type: GET_DATA_STATUS, payload: "Your data is being unzipped"})
      await extract(fileNamePath, { dir: `${documentsPath}/your_data/facebook` })
      console.log('Extraction complete')
    } catch (err) {
      // could not unzip
      console.log("Could not handle unzipping")
      dispatch({type: GET_DATA_STATUS, payload: "Error unzipping"})
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
    dispatch({type: GET_DATA_STATUS, payload: "Finished download and unzip. Your data is in the Documents directory on this computer!"})
  }
  else console.log("Donwload didn't start")
}

export default downloadFile;
