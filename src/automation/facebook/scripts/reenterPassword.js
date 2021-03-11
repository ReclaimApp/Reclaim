import startHeadfullBrowser from "./startHeadfullBrowser"
import gotoDownloadOption from "./gotoDownloadOption"
const reenterPassword = async (props) => {
  console.log("starting the reenterpassword manual process")
  const {pageUrl, absoluteCredentialsPath} = props
  /* solution if I where to have their password
      // retype password
      await doc.fill('input[type=password]', process.env.PASS);

      // submit password
      // await doc.click("td button[type=submit]")
      download = [download] = await Promise.all([
        page.waitForEvent('download'), // wait for download to start
        doc.click('td button[type=submit]'),
      ]);
      */

  /* let user enter their password */
  const isRunWithCredentials = true
  const {browser, page} = await startHeadfullBrowser({isRunWithCredentials, absoluteCredentialsPath})
  debugger

  // go to the download page
  await page.goto(pageUrl, {waitUntil: "networkidle"})
  console.log("Go to the download page")
  debugger

  // focus on the frame and go to the download tab
  console.log("Heading to the download tab")
  let doc = await gotoDownloadOption(page)
  console.log("on the download tab")

  // click the submit button
  console.log("going to click the download button")
  await doc.click("button[type=submit]")
  console.log("finishing clicking the download button")

  // wait until the password fill is gone, and the file start downloading
  //todo: needs to be tested
  console.log("Wait for the user to enter password")
  await Promise.all([
    doc.waitForSelector('td button[type=submit]', {state:'detached', timeout: 0}),
    page.waitForEvent('download', {timeout: 0})
  ])
  console.log("Finishing waiting for user to insert the password")

  // close the browser
  browser.close()



}

export default reenterPassword
