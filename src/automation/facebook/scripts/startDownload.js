import reattachFrame from './reattachFrame';
import reenterPassword from "./reenterPassword"
import gotoDownloadOption from "./gotoDownloadOption"

const startDownload = async (props) => {
  const {page, absoluteCredentialsPath} = props

  /* go to download option */
  let doc = await gotoDownloadOption(page)
  /* start downloading */
  //check if there is a download button
  const isDownloadButton = await doc.$("button[type=submit]") ? true : false

  if(isDownloadButton){
    // click download button
    console.log('Starting download');
    let download
    try {
      page.on("download", downloadEvent => {
        download = downloadEvent
      })
      await doc.click('button[type=submit]')
      let isDownloading
      try {
        //waiting to see if there is
        isDownloading = await doc.waitForSelector("td button[type=submit]") ? false : true
      } catch (error) {
        isDownloading = true
      }

      if(isDownloading){
        debugger

        // capture the download event
        // download = await page.waitForEvent('download')
        console.log({download})
      }
      else{
        debugger

        // facebook  asked to reenter password
        console.log('Asked to reenter password');

        // let user enter their password then on headfull then rerun the download script on headless
        console.log("going to reenter password")
        const pageUrl = await page.url()
        await reenterPassword({pageUrl, absoluteCredentialsPath})

        //? does the page needs to be reloaded
        // reflect the password being reenter
        console.log("Reloading the page")
        await page.reload({waitUntil: "networkidle"})

        // go to the download tab
        console.log("focusing on the refresh frame")
        doc = await gotoDownloadOption(page)

        //download again
        console.log("starting donwloading the file after reentering the password")
        // await doc.click('button[type=submit]')
        [download] = await Promise.all([
          page.waitForEvent('download'),
          doc.click('button[type=submit]')
        ])
      }
    } catch (error) {

      console.log("Download fail")
      console.log(error)
    }

    //pass on the doc and the download
    return {doc, download, isDownloadStarted: true}

  }
  else{
    // handle the case when there is no download button to press?
    console.log("No file to download. Create new file.")

    //close the browser
    return {isDownloadStarted: false}
  }
}

  export default startDownload
