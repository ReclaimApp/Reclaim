import React from 'react';
import fs from 'fs';
import { useDispatch, useSelector } from 'react-redux';
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
  fs.opendir('src/user_data', (error, dir) => {
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
          // Need to read all of the directories for the files within and ignore the index.html since we already have that in state
          if (folder !== 'index.html') {
            const subFolderArray = fs.readdirSync(
              `src/user_data/${dirent.name}/${folder}`
            );
            // Now we map through all of the files to dispatch them into Redux state
            subFolderArray.map((file) => {
              if (file.includes('.html')) {
                const fileHtml = fs.readFileSync(
                  `src/user_data/${dirent.name}/${folder}/${file}`,
                  'utf8'
                );
                dispatch({
                  type: POPULATE_CATEGORIES,
                  path: folder,
                  data: fileHtml,
                });
                console.log(folder, fileHtml);
              }
              return null;
            });
            return null;
          }
          return null;
        });
      }
      dir.close();
    });
  });
  return null;
};

export default UserDataRetrieval;
