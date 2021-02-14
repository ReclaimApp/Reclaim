import React from 'react';
import fs from 'fs';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_INDEX_HTML,
  GET_FOLDER_NAME,
  POPULATE_CATEGORIES,
  USER_DATA,
  POPULATE_IMAGES,
  POPULATE_VIDEO,
  POPULATE_MESSAGES,
} from '../store/Actions';

// This component will check if the correct data directories are in user_data
const UserDataRetrieval = () => {
  const dispatch = useDispatch();

  const getFbIndex = (name) => {
    const index = fs.readFileSync(`src/user_data/${name}/index.html`, 'utf8');
    dispatch({ type: GET_INDEX_HTML, payload: index });
  };

  // This function parses the fb directory to find and dispatch all of the .html files with their parent folder names (the categories)
  const getFbCategories = (folders, name) => {
    folders.map((folder) => {
      // Need to read all of the directories for the files within and ignore the index.html since we already have that in state
      if (folder !== 'index.html') {
        const subFolderArray = fs.readdirSync(
          `src/user_data/${name}/${folder}`
        );
        // Now we map through all of the files to dispatch them into Redux state
        subFolderArray.map((file) => {
          if (file.includes('.html')) {
            const fileHtml = fs.readFileSync(
              `src/user_data/${name}/${folder}/${file}`,
              'utf8'
            );
            dispatch({
              type: POPULATE_CATEGORIES,
              payload: {
                path: folder,
                name: file,
                data: fileHtml,
              },
            });
          }
          return null;
        });
        return null;
      }
      return null;
    });
  };

  // Open and read the user_data dir
  fs.opendir('src/user_data', (error, dir) => {
    dir.read((err, dirent) => {
      // Here there will be a condition for each social media data folder (for right now it's only FB)
      if (dirent.name.includes('facebook')) {
        // First we will dispatch our directory name to Redux state
        dispatch({ type: GET_FOLDER_NAME, payload: dirent.name });
        // Now we can add the index.html to Redux state through the getFbIndex function
        getFbIndex(dirent.name);
        // Get the names of all of the data folders
        const arrayOfFolders = fs.readdirSync(`src/user_data/${dirent.name}`);
        // Pass the names to getCategories to be parsed and dispatched to state
        getFbCategories(arrayOfFolders, dirent.name);
        // Get the photos/videos
      }
      dir.close();
    });
  });
  return null;
};

export default UserDataRetrieval;
