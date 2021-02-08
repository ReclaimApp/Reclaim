import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { useSelector } from 'react-redux';

const DataDisplay = (props) => {
  const images = useSelector((state) => state.images);
  const video = useSelector((state) => state.video);

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
        // Extracting the name of the photo from the src attrib
        const mediaItems = domNode.attribs.src.split('/');
        // The name is the last item after being split by "/"
        const mediaItem = mediaItems.pop();

        if (domNode.name === 'img') {
          images.map((file) => {
            if (file.name === mediaItem) {
              domNode.attribs.src = file.data;
              return domNode;
            }
            // The src attribs with the url "https://interncache-ash.fbcdn.net" were the ones giving me trouble
            // The file name can still be extracted from src just in a different way then mediaItem
            if (domNode.attribs.src.includes('interncache')) {
              const completeSrc = domNode.attribs.src.split('/');
              const srcFragement = completeSrc[5].split('?');
              const srcID = srcFragement[0].split('.');
              if (file.name.includes(srcID[0])) {
                domNode.attribs.src = file.data;
                return domNode;
              }
            }
            return domNode;
          });
        } else if (domNode.name === 'video') {
          video.map((file) => {
            if (file.name === mediaItem) {
              domNode.attribs.src = file.data;
              return domNode;
            }
            if (domNode.attribs.src.includes('interncache')) {
              const completeSrc = domNode.attribs.src.split('/');
              const srcFragement = completeSrc[5].split('?');
              const srcID = srcFragement[0].split('.');
              if (file.name.includes(srcID[0])) {
                domNode.attribs.src = file.data;
                return domNode;
              }
            }
            return domNode;
          });
        }
      } else if (domNode.name === 'a') {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const pathSplit = domNode.attribs.href.split('/');
              props.history.push(pathSplit[2]);
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
    },
  };

  return parse(props.data, options);
};

export default DataDisplay;
