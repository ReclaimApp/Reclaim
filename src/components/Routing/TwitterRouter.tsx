import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TwitterDataDisplay from '../Rendering/TwitterDataDisplay';

const TwitterRouter = () => {
  return (
    <HashRouter key={uuidv4()}>
      <Route
        key={uuidv4()}
        path="/twitter"
        render={(props) => <TwitterDataDisplay {...props} />}
      />
    </HashRouter>
  );
};

export default TwitterRouter;
