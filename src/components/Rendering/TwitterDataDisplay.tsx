import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import Placeholder from '../../placeholder.html';

const TwitterDataDisplay = () => {
  const index = useSelector((state) => state.TwitterReducer.index);
  return parse(
    '<iframe src="./user_data/twitter-2021-01-15-5e0215d1c9ddaa58003e43c74b90ce6d60009eb09558fcd716a55a03df5aa46c/Your archive.html" name="twitter-data" style={width: "100vw", height: "100vh"} />'
  );
};

export default TwitterDataDisplay;
