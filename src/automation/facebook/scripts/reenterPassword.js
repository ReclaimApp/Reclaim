import startHeadfullBrowser from "./startHeadfullBrowser"
import gotoDownloadOption from "./gotoDownloadOption"
const reenterPassword = async (pageUrl) => {
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
  const {browser, page} = await startHeadfullBrowser()

  await page.goto(pageUrl)
  let doc = await gotoDownloadOption(page)
  await doc.click("button[type=submit]")

  // wait until the password fill is gone, and the file start downloading
  //todo: needs to be tested
  await Promise.all([
    doc.waitForSelector('td button[type=submit]', {state:'detached', timeout: 0}),
    page.waitForEvent('download', {timeout: 0})
  ])

  // close the browser
  browser.close()



}

export default reenterPassword
