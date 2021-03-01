async function createFile(doc) {
  /* create file */
  // select the create file button
  const createFileButton = await doc.$(
    "//button//div[text()='Create File']/../.."
  );

  // check if it's able or desable
  // aria-disabled is not the same has general disable attribute
  const buttonDissable = await createFileButton.getAttribute('aria-disabled');
  const isButtonEnable = buttonDissable === 'false';

  // act different if base on the button avalability
  if (isButtonEnable) {
    // button is enable
    try {
      await Promise.all([
        createFileButton.click(),
        doc.waitForSelector(
          "//div[text()='A copy of your information is being created.']"
        ),
      ]);
    } catch (error) {
      console.log("Didn't see 'A copy of your information is being created.'");
    }
  } else {
    // button is disable
    console.log('files are already being created');
  }
}

export default createFile
