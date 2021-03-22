import React from 'react';
import fs from 'fs';
import { useDispatch } from 'react-redux';
import {
  GET_FB_INDEX_HTML,
  POPULATE_CATEGORIES,
  USER_FB_DATA,
  GET_TWTR_FOLDER_NAME,
  USER_TWTR_DATA,
} from '../store/Actions';

// This component will check if the correct data directories are in user_data
const UserDataRetrieval = () => {
  const dispatch = useDispatch();
  const documentsPath = window.process.argv.slice(-1)[0];

  // Check if the 'your_data' directory has been created in the users Documents
  const userDataCheck = fs
    .readdirSync(`${documentsPath}`)
    .filter((doc) => doc === 'your_data')[0];

  if (userDataCheck) {
    // Facebook retrieval
    // First we initialize fbDataCheck which looks in the Documents directory and filters for folders named 'Facebook'
    const fbDataCheck = fs
      .readdirSync(`${documentsPath}/your_data`)
      .filter((doc) => doc === 'facebook')[0];
    // If fbDataCheck is true we can move on to parse it
    if (fbDataCheck) {
      // Map through the facebook folder
      const fbData = fs.readdirSync(`${documentsPath}/your_data/facebook`);
      fbData.map((directory) => {
        if (directory.includes('.html')) {
          // The only .html file in this directory will be index
          const index = fs.readFileSync(
            `${documentsPath}/your_data/facebook/${directory}`,
            'utf8'
          );
          // Now we dispatch the html as a string to our Redux store
          dispatch({ type: GET_FB_INDEX_HTML, payload: index });
        } else {
          // Everything besides index.html is a subFolder we will need to parse
          const subFolder = fs.readdirSync(
            `${documentsPath}/your_data/facebook/${directory}`
          );
          // Now we map through the sub folder
          subFolder.map((file) => {
            // Now any of the .html files will be the actual user data
            if (file.includes('.html')) {
              const fileHtml = fs.readFileSync(
                `${documentsPath}/your_data/facebook/${directory}/${file}`,
                'utf8'
                );
              // We need to dispatch each html string with the appropriate file name and parent folder name
              dispatch({
                type: POPULATE_CATEGORIES,
                payload: {
                  path: directory,
                  name: file,
                  data: fileHtml,
                },
              });
            }
            return null;
          });
        }
        return null;
      });
      // Finally we will dispatch a bool that signifies that the data is in the app
      dispatch({ type: USER_FB_DATA });
    }

    // Twitter retrieval
    fs.readdirSync(`${documentsPath}/your_data`, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        if (dirent.name.includes('twitter')) {
          // For Twitter we only need to dispatch the folder name and the data bool
          dispatch({ type: GET_TWTR_FOLDER_NAME, payload: dirent.name });
          // Now we dispatch a bool that signifies that the data is in the app
          dispatch({ type: USER_TWTR_DATA });
        }
        return null;
      });
  }
};

export default UserDataRetrieval;
