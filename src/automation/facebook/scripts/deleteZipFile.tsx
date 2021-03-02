import fs from 'fs';

const deleteZipFile = () => {
  fs.readdirSync('src/user_data/facebook', { withFileTypes: true })
    .map((dirent) => {
      if (dirent.name.includes('.zip')) {
        fs.unlink(`src/user_data/facebook/${dirent.name}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
}

export default deleteZipFile;
