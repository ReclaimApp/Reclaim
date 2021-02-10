import React from 'react';
import { readdirSync } from 'fs';

const UserDataRetrieval = () => {
  readdirSync('src/user_data', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      if (dirent.name.includes('facebook')) {
        console.log(dirent);
      }
      return dirent;
    });
};

export default UserDataRetrieval;
