import reattachFrame from'./reattachFrame';
import storeCredentials from './login';

async function goToDownloadFile(context) {
  // Create a new page in a pristine context.
  const page = await context.newPage();

  // go to download your information
  await page.goto(
    'https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings',
    { waitUntil: 'networkidle' }
  );

  // select child frame
  let doc
  try {
    doc = await reattachFrame(page);
  } catch (error) {
    /* if credentials are out of date, update them */
    // should fail only when you are not login
    console.log("Credentials appear to be out of date. Starting to update them.")
    const isSaveNewCredentials = true
    await storeCredentials(isSaveNewCredentials);
    doc = await reattachFrame(page);
  }

  // return the page, and doc
  return [page, doc];
}

export default goToDownloadFile;
