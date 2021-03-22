import reattachFrame from "./reattachFrame"

const gotoDownloadOption = async (page) => {
    /* select child frame */
    // have to do this because after waiting for file to be ready by realoding the page the
    // old doc is detach from the page
    // like if it was a Interval ID
    let doc = await reattachFrame(page);

    /* Go to download option */
    // go to available copies to download the data
    const avaliableCopiesTab = 'li:last-child';
    // const avaliableCopiesTab = await page.waitForSelector("li:last-child")
    await doc.click(avaliableCopiesTab);

    // return the focus frame
    return doc
  }

  export default gotoDownloadOption
