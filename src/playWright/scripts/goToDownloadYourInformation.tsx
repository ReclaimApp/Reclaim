import reattachFrame from'./reattachFrame';

async function goToDownloadYourInformation(context) {
  // Create a new page in a pristine context.
  const page = await context.newPage();

  // go to download your information
  await page.goto(
    'https://www.facebook.com/dyi/?x=AdkadZSUMBkpk0EF&referrer=yfi_settings',
    { waitUntil: 'networkidle' }
  );

  // select child frame
  const doc = await reattachFrame(page);

  // return the page, and doc
  return [page, doc];
}

export default goToDownloadYourInformation;
