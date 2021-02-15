import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { useSelector } from 'react-redux';

const DataDisplay = (props) => {
  const folderName = useSelector((state) => state.folderName);

  const options = {
    replace: (domNode) => {
      if (!domNode.attribs) {
        return;
      }
      if (domNode.attribs.src) {
        domNode.attribs.src = `src/user_data/${folderName}/${domNode.attribs.src}`;
      } else if (domNode.name === 'a') {
        domNode.attribs.href = `src/user_data/${folderName}/${domNode.attribs.href}`;
      }
    },
  };

  return parse(props.data, options);
};

export default DataDisplay;
