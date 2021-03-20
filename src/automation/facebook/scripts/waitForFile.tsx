import React from 'react';
import reattachFrame from './reattachFrame';
import {GET_DATA_STATUS} from "../../../store/Actions";
import {useDispatch} from 'react-redux';

async function waitForFile(page, doc) {
  const dispatch = useDispatch()
  /* waitForFile */
  // refresh every 5 minute until notice of gathering file is gone
  // then Pending becomes download
  // facebook does not refreshes the page after the content is ready so you have to do it.
  const fiveMinutes = 300000;
  let isWatingProcess = !!(await doc.$(
    "//div[text()='A copy of your information is being created.']"
  ));

  while (isWatingProcess) {
    // reload frame
    console.log('going to reload');
    await page.reload();

    // reattach frame
    doc = await reattachFrame(page);

    // wait for 5 minutes
    console.log(
      `going to start waiting for 5 min starting in ${Date().split(' ')[4]}`
    );
    dispatch({type: GET_DATA_STATUS, payload: "Facebook is creating your data file (this can take awhile)"})
    await doc.waitForTimeout(fiveMinutes);
    console.log('finish reloading');

    // check if notice is gone
    isWatingProcess = !!(await doc.$(
      "//div[text()='A copy of your information is being created.']"
    ));
  }

  // if no file to wait for say so
  if (isWatingProcess === false) {
    console.log('There is no file to wait for');
  }
  dispatch({type: GET_DATA_STATUS, payload: "Finished waiting for data, proceding to download."})
  console.log('finish waiting for data');
}

export default waitForFile;
