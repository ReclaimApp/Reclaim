async function reattachFrame(page) {
  const frameDocUrl = await (await page.waitForSelector('iframe')).getAttribute(
    'src'
  );
  const doc = await page.frame({ url: frameDocUrl });
  return doc;
}

export default reattachFrame;
