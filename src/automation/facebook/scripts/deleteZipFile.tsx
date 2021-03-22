import {readdirSync, unlink} from 'fs';
import { normalize } from 'path';

const deleteZipFile = () => {
  const fileNamePath = normalize(`${__dirname}/user_data`)
  readdirSync(fileNamePath, { withFileTypes: true })
    .map((dirent) => {
      if (dirent.name.includes('.zip')) {
        unlink(`${fileNamePath}/${dirent.name}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
}

export default deleteZipFile;
