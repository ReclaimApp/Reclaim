import fs from 'fs';
import { normalize } from 'path';

const deleteZipFile = () => {
  const fileNamePath = normalize(`${__dirname}/user_data`)
  fs.readdirSync(fileNamePath, { withFileTypes: true })
    .map((dirent) => {
      if (dirent.name.includes('.zip')) {
        fs.unlink(`${fileNamePath}/${dirent.name}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
}

export default deleteZipFile;
