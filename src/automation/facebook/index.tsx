import login from './scripts/login';
import goToDownloadFile from './scripts/goToDownloadFile'
import askForFile from'./scripts/askForFiles';
import waitForFile from'./scripts/waitForFile';
import downloadFile from './scripts/downloadFile';
import setUpBrower from './scripts/setUpBrowser';
import credentialsFile from "../../user_data/credentials/facebookCredentials"
import process from "process"
import { normalize } from 'path';
import initCredentials from "../helperFunctions/initCredentials"
import { existsSync, readFileSync } from 'fs'

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
  have a default case in case the user is having problems.
  I can always just let the script break and close the script. They could always just rerun it

  better is to lock the credential file from being delete while the app is running.
  init credential files before running the script
*/

async function index(
  downloadPath = normalize(`${__dirname}/user_data/facebook`),
  isSaveCredentials = false,
  isUpdateCredentials = false,
  ) {
  /* credentialsPath */
  const absoluteCredentialsPath = normalize(`${__dirname}/user_data/credentials/facebookCredentials.js`)
  const relativeCredetialsPath = "../../user_data/credentials/facebookCredentials"
  console.log({credentialsPath: absoluteCredentialsPath})

  /* Dynamically import the credentials file*/
  let credentialsFile
  const isCredentialsExist = existsSync(absoluteCredentialsPath)
  console.log({isCredentialsExist})
  // improt credential files if they exist
  if (isCredentialsExist){
    // credentialsFile = await import("D:\\Lambda\\projects\\SelfExploreApp\\src\\user_data\\credentials\\facebookCredentials.js") //import only accepts relative paths
    // readFileSync(absoluteCredentialsPath, (err, data) => {
    // if (err) console.log(err);
    // credentialsFile = data
    // console.log({data});
    // });
    credentialsFile = readFileSync(absoluteCredentialsPath, {encoding: 'utf8'})
  }
  // if credential File does not exist then set it to null
  else credentialsFile = null

  /* login to facebook*/
  // skipped if there is a valid credential file
  // save credentials to env variable for a 1 time user or
  // save then to a file for multiple uses

  // if you have a credential file then skip login
  // go to doownloadFile checks if the credentials are valid
  //todo: if they don't sign in, I cannot resign in when facebook asks!
  //? what about capturing the id and password?
  //? what about waiting until they close the window? so if they have to do a 2 verification they can do it.
  console.log({credentialsFile})
  const isNoCredentials = credentialsFile ? false : true
  console.log({isNoCredentials})
  debugger
  if(isNoCredentials || isSaveCredentials || isUpdateCredentials) {
    debugger
    await login(isSaveCredentials, isUpdateCredentials, absoluteCredentialsPath);
  }

  /* start browser */
  const storage = credentialsFile ? JSON.stringify(credentialsFile) : process.env.STORAGE
  console.log({storage})
  const [browser, context] = await setUpBrower(storage, downloadPath);

  try {
    /* select correct frame */
    const [page, dataDoc] = await goToDownloadFile(context);

    // /* ask for files */
    // await askForFile(dataDoc);

    // /* Wait for files */
    // await waitForFile(page, dataDoc);

    /* Download files */
    // await downloadFile(page, browser);

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
