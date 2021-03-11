import {writeFile} from "fs"

const writeDocument = async ( filePathName, data ) => {
  await writeFile(filePathName, data, function (err) {
    if (err) return console.log(err);
    console.log(`File Created: ${filePathName}`);
  });
}

export default writeDocument
