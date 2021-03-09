import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import FbCategoryRouter from './components/Routing/FbCategoryRouter';
import Categories from './components/Rendering/CategoriesDisplay';
import UserDataRetrieval from './utils/UserDataRetrieval';
import TwitterDataDisplay from './components/Rendering/TwitterDataDisplay';
import ManualFacebookReclaim from "./components/ManualReclaim/ManualFacebookReclaim";
import ManualTwitterReclaim from "./components/ManualReclaim/ManualTwitterReclaim";
import './App.global.css';

const App = () => {
  // This is a bool from redux state signifiying that the FB data is in the correct directory and format
  const userFbData = useSelector((state) => state.FacebookReducer.userFbData);
  // This is a bool from redux state signifiying that the Twitter data is in the correct directory and format
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
          <Route path='/manualFacebook' render={(props) => <ManualFacebookReclaim {...props} />} />
          <Route path='/manualTwitter' render={(props) => <ManualTwitterReclaim {...props} />} />
          <Route
            exact
            path="/categories"
            render={(props) => <Categories {...props} />}
          />
          {/* If the Twitter data is in the correct directory this route will render */}
          {userTwtrData ? (
            <>
              <Route
                path="/twitter"
                render={(props) => <TwitterDataDisplay {...props} />}
              />
            </>
          ) : null}
        </Switch>
      </HashRouter>
      {userFbData ? (
        <>
          <FbCategoryRouter />
        </>
      ) : null}
    </div>
  );
};

export default App;
