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

  // Facebook retrieval
  const fbData = fs.readdirSync(`${documentsPath}/facebook`);
  fbData.map((directory) => {
    console.log(directory);
    if (directory.includes('.html')) {
      const index = fs.readFileSync(
        `${documentsPath}/facebook/${directory}`,
        'utf8'
      );
      dispatch({ type: GET_FB_INDEX_HTML, payload: index });
    } else {
      const subFolder = fs.readdirSync(
        `${documentsPath}/facebook/${directory}`
      );
      subFolder.map((file) => {
        if (file.includes('.html')) {
          const fileHtml = fs.readFileSync(
            `${documentsPath}/facebook/${directory}/${file}`,
            'utf8'
          );
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

  // Twitter retrieval
  fs.readdirSync(`${documentsPath}`, { withFileTypes: true })
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
};

export default UserDataRetrieval;
