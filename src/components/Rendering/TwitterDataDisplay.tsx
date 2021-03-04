import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const TwitterDataDisplay = () => {
  const documentsPath = window.process.argv.slice(-1)[0];
  const name = useSelector((state) => state.TwitterReducer.folderName);
  return parse(
    `<iframe src="${documentsPath}/your_data/${name}/Your archive.html" name="twitter-data" style="width: 100vw; height: 100vh; background: white;" />`
  );
};

export default TwitterDataDisplay;
