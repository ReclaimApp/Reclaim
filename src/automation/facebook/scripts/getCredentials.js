import { normalize } from 'path';
import login from './login';
import getCredentialFile from "../../helperFunctions/getCredentialFile"

const getCredentials = async(absoluteCredentialsPath) => {
    /* paths to files */
    const relativeCredetialsPath = "../../user_data/credentials/facebookCredentials"
    console.log({credentialsPath: absoluteCredentialsPath})

    /* Dynamically import the credentials file*/
    let credentialsFile
    credentialsFile = getCredentialFile(absoluteCredentialsPath)

    /* create creadential file*/
    // skipped if there is a valid credential file
    // save then to a file for multiple uses

    //todo: if they don't sign in, I cannot resign in when facebook asks!
    //? what about capturing the id and password?
    //? what about waiting until they close the window? so if they have to do a 2 verification they can do it.
    console.log({credentialsFile})
    const isNoCredentials = credentialsFile ? false : true
    console.log({isNoCredentials})
    if(isNoCredentials) {
      // capture user cookies and save it into their facebook credential file
      await login(absoluteCredentialsPath);

      // save the credential file data
      credentialsFile = getCredentialFile(absoluteCredentialsPath)
      console.log({credentialsFile})

    }else{
        // todo: check that the cookies are not invalid

    }

    //return the credentialsFile if found or null if not
    return credentialsFile
  }
  export default getCredentials
