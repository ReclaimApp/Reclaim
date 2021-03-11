import {writeFile} from "fs"
// only makes makes a file not a folder

const writeDocument = async ( filePathName, data ) => {
  await writeFile(filePathName, data, function (err) {
    if (err) return console.log(err);
    console.log(`File Created: ${filePathName}`);
  });
}

export default writeDocument
