import reattachFrame from './reattachFrame';

async function waitForFile(page, doc) {
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

  console.log('finish waiting for data');
}

export default waitForFile;
