import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import Placeholder from '../../placeholder.html';

const TwitterDataDisplay = () => {
  const index = useSelector((state) => state.TwitterReducer.index);
  return Placeholder;
};

export default TwitterDataDisplay;
