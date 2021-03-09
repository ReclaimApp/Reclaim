import reattachFrame from './reattachFrame';
import reenterPassword from "./reenterPassword"


const startDownload = async (page) => {
  /* go to download option */
  let doc = await gotoDownloadOption(page)

  /* start downloading */
  //check if there is a download button
  const isDownloadButton = await page.$("button[type=submit]") ? true : false
  if(isDownloadButton){
    // click download button
    console.log('Starting download');
    let download
    try {
      [download] = await Promise.all([
        page.waitForEvent('download'),
        doc.click('button[type=submit]')
      ])

      // await doc.click('button[type=submit]');
      // download = await page.waitForEvent('download'); // wait for download to start
    } catch (error) {
      // facebook  asked to reenter password
      console.log('Asked to reenter password');

      // let user enter their password then on headfull then rerun the download script on headless
      await reenterPassword(await page.url())

      // todo: add a conditional to check if page needs to be reloaded or not
      // reflect the password being reenter
      await page.reload()

      // refocus on the frame
      //?does refreshing keep it on the same tab?
      doc = await reattachFrame(page);

      //download again
      [download] = await Promise.all([
        page.waitForEvent('download'),
        doc.click('button[type=submit]')
      ])



    }


    //pass on the doc and the download
    return [doc, download]

  }
  else{
    // handle the case when there is no download button to press?
      console.log("No file to download. Create new file.")

      //close the browser
      browser.close()
  }
}

  export default startDownload
