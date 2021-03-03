import fs from "fs"

const writeFile = ( filePathName, data ) => {
  fs.writeFile(filePathName, data, function (err) {
    if (err) return console.log(err);
    console.log(`File Created: ${filePathName}`);
  });
}

export default writeFile
