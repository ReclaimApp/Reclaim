import React from 'react';
import fs from 'fs';
import { useDispatch } from 'react-redux';
import {
  GET_INDEX_HTML,
  POPULATE_CATEGORIES,
  USER_DATA,
  POPULATE_IMAGES,
  POPULATE_VIDEO,
  POPULATE_MESSAGES,
} from '../store/Actions';

// This component will check if the correct data directories are in user_data
const UserDataRetrieval = () => {
  // Open and read the user_data dir
  const dispatch = useDispatch();
  fs.opendir('src/user_data', (dir) => {
    dir.read((err, dirent) => {
      // Here there will be a condition for each social media data folder (for right now it's only FB)
      if (dirent.name.includes('facebook')) {
        // If the data folder is present then add the index.html to Redux state
        const index = fs.readFileSync(
          `src/user_data/${dirent.name}/index.html`,
          'utf8'
        );
        dispatch({ type: GET_INDEX_HTML, payload: index });

        // Get the names of all of the data folders
        const arrayOfFolders = fs.readdirSync(`src/user_data/${dirent.name}`);
        arrayOfFolders.map((folder) => {
          console.log(folder);
          return null;
        });
      }
      dir.close();
    });
  });
  return null;
};

export default UserDataRetrieval;
