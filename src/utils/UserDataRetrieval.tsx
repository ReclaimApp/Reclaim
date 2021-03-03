import React from 'react';
import fs from 'fs';
import { useDispatch } from 'react-redux';
import path from 'path';
import dataDir from '../automation/facebook/scripts/dataDir';
import {
  GET_FB_INDEX_HTML,
  GET_FB_FOLDER_NAME,
  POPULATE_CATEGORIES,
  USER_FB_DATA,
  GET_TWTR_FOLDER_NAME,
  USER_TWTR_DATA,
} from '../store/Actions';

// This component will check if the correct data directories are in user_data
const UserDataRetrieval = () => {
  const dispatch = useDispatch();

  // Facebook retrieval
  const fbData = fs.readdirSync(dataDir('facebook'));
  fbData.map((directory) => {
    if (directory.includes('.html')) {
      const index = fs.readFileSync(
        `src/user_data/facebook/${directory}`,
        'utf8'
      );
      dispatch({ type: GET_FB_INDEX_HTML, payload: index });
    } else {
      const subFolder = fs.readdirSync(`src/user_data/facebook/${directory}`);
      subFolder.map((file) => {
        if (file.includes('.html')) {
          const fileHtml = fs.readFileSync(
            `src/user_data/facebook/${directory}/${file}`,
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
  const twitterPath = path.join(process.cwd(), `/src/user_data/`);
  fs.readdirSync(twitterPath, { withFileTypes: true })
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
