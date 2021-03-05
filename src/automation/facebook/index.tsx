import login from './scripts/login';
import goToDownloadFile from './scripts/goToDownloadFile'
import askForFile from'./scripts/askForFiles';
import waitForFile from'./scripts/waitForFile';
import downloadFile from './scripts/downloadFile';
import setUpBrower from './scripts/setUpBrowser';
import initCredentials from "./scripts/initCredentials"
import getCredentials from "../getCredentials"

/*
  cases:
  initial set setup case
  mulitple uses
  only using env var
  login and saved saving their cookies
  after a big off time their cookies got outdate
    - update cookies
    - or use env vars

  can set to null if credentials file if found out that they are outdate
  can init a null credential file before starting the script
  can handle the case when their is no credential file to import
  null credentials can be fill
  if the user decided they can overwrite their credential file when ever they choice
  they can set their credential file to null when ever they want

  not having a explicit isCredentialsValid is confusing
*/

async function index(
  isSaveNewCredentials = false,
  credentialPath = "D:\\Documents\\SelfExploreApp\\user_data\\credentials\\facebook",
  downloadPath = "D:\\Documents\\SelfExploreApp\\user_data\\facebook"
  ) {
  /* init credentials */
  //make sure credentials file exist
  // avoids import errors
  // if there is no existing file then the file is creted with a returning value of null
  initCredentials(credentialPath)

  // get the credential file
  // this could be a 2+ use, and they may have a credential file
  let credentialsFile
  try {
    credentialsFile = getCredentials()
  } catch (error) {
    console.log("Credential files got delete")
    initCredentials(credentialPath)
    credentialsFile = getCredentials()
  }
  console.log("credentialsFile: " + credentialsFile)
  let isCredentialPopulated = credentialsFile ? true : false
  const isInvalidCredentialFile = !isCredentialPopulated

  /* login to facebook*/
  // skipped if there is a valid credential file
  // save credentials to env variable for a 1 time user or
  // save then to a file for multiple uses

  // if you have a credential file then skip login
  // go to doownloadFile checks if the credentials are valid
  if(isInvalidCredentialFile || isSaveNewCredentials) {
    await login(isSaveNewCredentials);

    // check if credentials got fill correctly
    try {
      credentialsFile = getCredentials()
      isCredentialPopulated = credentialsFile ? true : false
    } catch (error) {
      console.log(error)
      console.log("Credential file got delete")

      // set credential file to null
      initCredentials(credentialPath)
      credentialsFile = getCredentials()
      isCredentialPopulated = credentialsFile ? true : false
    }
  }

  // this is a fork in the rode
  // the app needs to handle if the user is using env var or a credentials file
  // a credential file that is not null or a env var that resets when app shutsdown

  /* start browser */
  //if the credentials file is null then use the env variable
  if(process.env.STORAGE === undefined) await login(isSaveNewCredentials) // if the user delete their credential without login in
  const storage = isCredentialPopulated ? JSON.stringify(credentialsFile) : process.env.STORAGE
  console.log("storage: " + storage)
  const [browser, context] = await setUpBrower(storage, downloadPath);

  try {
    /* select correct frame */
    const [page, dataDoc] = await goToDownloadFile(context);

    // /* ask for files */
    // await askForFile(dataDoc);

    // /* Wait for files */
    // await waitForFile(page, dataDoc);

    /* Download files */
    await downloadFile(page, browser);

    /* unzip file and delete zip file */

    /* Close Automation */
    await browser.close();

  } catch (error) {
    /* handle the handless script breaking */
    console.log("the headless script broke")
    console.log(error)

    /* Close Automation */
    // await browser.close();

  }

}

export default index
