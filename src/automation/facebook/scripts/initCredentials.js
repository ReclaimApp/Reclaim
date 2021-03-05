import { existsSync } from 'fs'
import writeFile from "../../writeFile"
const initCredentials = (credentialPath) => {
  /* init credentials file */
  //check if there is credentials
  const isCredentialsNotExist = !(existsSync(credentialPath))
  if (isCredentialsNotExist){
    // if it does not exist create credentials file
    writeFile(credentialPath, "const credentials = null")
  }

}

export default initCredentials
