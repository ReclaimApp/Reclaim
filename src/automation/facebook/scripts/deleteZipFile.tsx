import fs from 'fs';

const deleteZipFile = () => {
  const facebookPath = window.process.argv.slice(-1)[0] + '/your_data'
  fs.readdirSync(facebookPath, { withFileTypes: true })
    .map((dirent) => {
      if (dirent.name.includes('.zip')) {
        fs.unlink(`${facebookPath}/${dirent.name}`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
}

export default deleteZipFile;
