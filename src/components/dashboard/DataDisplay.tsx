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
      if (
        domNode.attribs.href &&
        domNode.attribs.href.includes('messages') &&
        props.location.pathname.includes('/messages')
      ) {
        const messageItem = domNode.attribs.href.split('/');
        const messageRoute = `${messageItem[messageItem.length - 2]}/${
          messageItem[messageItem.length - 1]
        }`;
        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.history.push(messageRoute);
            }}
            onKeyDown={(e) => {
              e.preventDefault();
              props.history.push(messageRoute);
            }}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'rgb(0, 0, 238)',
            }}
          >
            {domToReact(domNode.children, options)}
          </button>
        );
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
