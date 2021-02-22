import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import Placeholder from '../../placeholder.html';

const TwitterDataDisplay = () => {
  const name = useSelector((state) => state.TwitterReducer.folderName);
  return parse(
    `<iframe src="./user_data/${name}/Your archive.html" name="twitter-data" style="width: 100vw; height: 100vh; background: white;" />`
  );
};

export default TwitterDataDisplay;
