import React from 'react';
import parse from 'html-react-parser';
import path from 'path';

const DataDisplay = (props) => {
  const documentsPath = window.process.argv.slice(-1)[0];
  const options = {
    replace: (domNode) => {
      if (!domNode.attribs) {
        return;
      }
      if (domNode.attribs.src) {
        domNode.attribs.src = `${documentsPath}/${domNode.attribs.src}`;
      } else if (domNode.name === 'a') {
        domNode.attribs.href = `${documentsPath}/${domNode.attribs.href}`;
        return domNode;
      }
    },
  };

  return parse(props.data, options);
};

export default DataDisplay;
