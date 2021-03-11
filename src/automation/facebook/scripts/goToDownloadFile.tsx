import reattachFrame from'./reattachFrame';
import login from './login';

async function goToDownloadFile(props) {
  const {context, absoluteCredentialsPath} = props
  // Create a new page in a pristine context.
  const page = await context.newPage();

  // go to download your information
  await page.goto('https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings'), {waitUntil: "domcontentloaded"};

  // select child frame
  let doc
  try {
    doc = await reattachFrame(page);
    await doc.waitForLoadState('domcontentloaded')
  } catch (error) {
    /* if credentials are out of date, update them */
    // should fail only when you are not login
    console.log("Credentials appear to be out of date. Starting to update them.")
    console.log(error)

    //recapture the cookies
    await login(absoluteCredentialsPath);

    // come back to the download website
    await page.goto('https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings',
    { waitUntil: 'networkidle' });

    // capture the frame
    doc = await reattachFrame(page);
  }

  // return the page, and doc
  return [page, doc];
}

export default goToDownloadFile;
