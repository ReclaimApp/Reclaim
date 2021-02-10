import React from 'react';
import { readdirSync, opendir } from 'fs';
import PopulateFacebookData from './PopulateFacebookData';

const UserDataRetrieval = () => {
  opendir('src/user_data', (dir) => {
    console.log(dir);
    dir.read((err, dirent) => {
      try {
        if (dirent.name && dirent.name.includes('facebook')) {
          // Invoke the function that will import fb_data and dispatch it to state
          // and be sure to pass in dirent.name so we can import the correct folder
          PopulateFacebookData(dirent.name);
        }
      } catch {
        console.log(`error `, err);
      }
      dir.close();
    });
  });
};

export default UserDataRetrieval;
