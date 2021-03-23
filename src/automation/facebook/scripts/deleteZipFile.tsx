import {readdirSync, unlink} from 'fs';

const deleteZipFile = (fileNamePath) => {
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
