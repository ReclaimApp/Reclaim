import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DataDisplay from '../dashboard/DataDisplay';

const MessageRouter = () => {
  const messageData = useSelector((state) => state.messages);

  return messageData.map((message) => {
    const path = `/messages/${message.name}`;
    return (
      <HashRouter key={uuidv4()}>
        <Route
          key={uuidv4()}
          path={path}
          render={(props) => <DataDisplay {...props} data={message.data} />}
        />
      </HashRouter>
    );
  });
};

export default MessageRouter;
