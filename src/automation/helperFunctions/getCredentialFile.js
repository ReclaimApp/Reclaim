import { existsSync, readFileSync } from 'fs'

const getCredentialFile = (absoluteCredentialsPath) => {
  //check if credential file exist
  const isCredentialsExist = existsSync(absoluteCredentialsPath)
  console.log({isCredentialsExist})

  // import credential files if they exist
  if(isCredentialsExist) return readFileSync(absoluteCredentialsPath, {encoding: 'utf8'})

  // if credential File does not exist then set it to null
  else return null
}

export default getCredentialFile
