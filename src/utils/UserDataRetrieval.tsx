import React from 'react';
import fs from 'fs';
import { useDispatch } from 'react-redux';
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

  // This function parses the fb directory to find and dispatch all of the .html files with their parent folder names (the categories)
  // const getFbCategories = (folders, name) => {
  //   folders.map((folder) => {
  //     // Need to read all of the directories for the files within and ignore the index.html since we already have that in state
  //     if (folder !== 'index.html') {
  //       const subFolderArray = fs.readdirSync(
  //         `src/user_data/${name}/${folder}`
  //       );
  //       // Now we map through all of the files to dispatch them into Redux state
  //       subFolderArray.map((file) => {
  //         if (file.includes('.html')) {
  //           const fileHtml = fs.readFileSync(
  //             `src/user_data/${name}/${folder}/${file}`,
  //             'utf8'
  //           );
  //           dispatch({
  //             type: POPULATE_CATEGORIES,
  //             payload: {
  //               path: folder,
  //               name: file,
  //               data: fileHtml,
  //             },
  //           });
  //         }
  //         return null;
  //       });
  //       return null;
  //     }
  //     return null;
  //   });
  // };

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

  // Open and read the user_data dir
  fs.readdirSync('src/user_data', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      // Here there will be a condition for each social media data folder (for right now it's only FB)
      if (dirent.name.includes('facebook')) {
        // First we will dispatch our directory name to Redux state
        dispatch({ type: GET_FB_FOLDER_NAME, payload: dirent.name });
        // Now we can add the index.html to Redux state through the getFbIndex function
        // getFbIndex(dirent.name);
        // Get the names of all of the data folders
        // const arrayOfFolders = fs.readdirSync(`src/user_data/${dirent.name}`);
        // Pass the names to getCategories to be parsed and dispatched to state
        // getFbCategories(arrayOfFolders, dirent.name);
        // Finally we will dispatch a bool that signifies that the data is in the app
        dispatch({ type: USER_FB_DATA });
        return null;
      }
      // Conditional for Twitter
      if (dirent.name.includes('twitter')) {
        console.log('here');
        // For Twitter we only need to dispatch the folder name and the data bool
        dispatch({ type: GET_TWTR_FOLDER_NAME, payload: dirent.name });
        // Now we dispatch a bool that signifies that the data is in the app
        dispatch({ type: USER_TWTR_DATA });
        return null;
      }
      return null;
    });
  return null;
};

export default UserDataRetrieval;
