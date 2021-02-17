import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import FbCategoryRouter from './components/Routing/FbCategoryRouter';
import Categories from './components/Rendering/CategoriesDisplay';
import UserDataRetrieval from './utils/UserDataRetrieval';
import TwitterRouter from './components/Routing/TwitterRouter';
import './App.global.css';

const App = () => {
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  const userTwtrData = useSelector(
    (state) => state.TwitterReducer.userTwtrData
  );
  // Run the component that locates and populates all of the user data
  UserDataRetrieval();
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route
            exact
            path="/categories"
            render={(props) => <Categories {...props} />}
          />
        </Switch>
      </HashRouter>
      {userFbData ? (
        <>
          <FbCategoryRouter />
        </>
      ) : null}
      {userTwtrData ? (
        <>
          <TwitterRouter />
        </>
      ) : null}
    </div>
  );
};

export default App;
