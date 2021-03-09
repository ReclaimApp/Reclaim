import { normalize } from 'path';
import { existsSync, readFileSync } from 'fs'
import login from './login';

const getCredentials = async() => {
    /* paths to files */
    const absoluteCredentialsPath = normalize(`${__dirname}/user_data/credentials/facebookCredentials.js`)
    const relativeCredetialsPath = "../../user_data/credentials/facebookCredentials"
    console.log({credentialsPath: absoluteCredentialsPath})

    /* Dynamically import the credentials file*/
    let credentialsFile
    const isCredentialsExist = existsSync(absoluteCredentialsPath)
    console.log({isCredentialsExist})
    // import credential files if they exist
    if (isCredentialsExist){
      credentialsFile = readFileSync(absoluteCredentialsPath, {encoding: 'utf8'})
    }
    // if credential File does not exist then set it to null
    else credentialsFile = null

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
      await login(absoluteCredentialsPath);
      credentialsFile = readFileSync(absoluteCredentialsPath, {encoding: 'utf8'})
    }
    return credentialsFile
  }
  export default getCredentials
