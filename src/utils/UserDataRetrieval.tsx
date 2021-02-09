import React from 'react';
import { readdirSync } from 'fs';

const UserDataRetrieval = () => {
  readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      console.log(dirent.name);
      if (dirent.name === 'user_data') {
        console.log(dirent);
      }
      return dirent;
    });
};

export default UserDataRetrieval;
