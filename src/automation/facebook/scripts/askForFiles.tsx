import goToDownloadOption from './goToDownloadOption';

async function createFile(doc, page) {
  /* create file */
  // select the create file button
  const createFileButton = await doc.$(
    "//button//div[text()='Create File']/../.."
  );

  // check if it's able or desable
  // aria-disabled is not the same has general disable attribute
  const buttonDissable = await createFileButton.getAttribute('aria-disabled');
  const isButtonEnable = buttonDissable === 'false';

  await goToDownloadOption(page);

  const isDownloadButton = (await doc.$('button[type=submit]')) ? true : false;
  const downloadButton = await doc.$('button[type=submit]');
  if (isDownloadButton) {
    downloadButton.click();
    // Now go back to the previous tab
    const avaliableCopiesTab = 'li:first-child';
    await doc.click(avaliableCopiesTab);

    return { isNeedtoWaitForFile: false };
  }

  // act different if base on the button avalability
  if (isButtonEnable) {
    // button is enable
    //click on the button then start waiting for the file
    try {
      await Promise.all([
        createFileButton.click(),
        doc.waitForSelector(
          "//div[text()='A copy of your information is being created.']"
        ),
      ]);

      return { isNeedtoWaitForFile: true };
    } catch (error) {
      console.log("Didn't see 'A copy of your information is being created.'");
    }
  } else {
    // the button is already click
    // start waiting for the file
    // button is disable
    console.log('files are already being created');
    return { isNeedtoWaitForFile: true };
  }
}

export default createFile;
