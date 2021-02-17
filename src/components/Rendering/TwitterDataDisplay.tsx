import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const TwitterDataDisplay = () => {
  const index = useSelector((state) => state.TwitterReducer.index);
  return parse(index);
};

export default TwitterDataDisplay;
