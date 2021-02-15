import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import CategoryRouter from './components/Routing/CategoryRouter';
import Categories from './components/Rendering/CategoriesDisplay';
import UserDataRetrieval from './utils/UserDataRetrieval';
import './App.global.css';

const App = () => {
  const userFbData = useSelector((state) => state.userFbData);
  UserDataRetrieval();
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Landing userFbData={userFbData} {...props} />}
          />
          <Route
            exact
            path="/categories"
            render={(props) => <Categories {...props} />}
          />
        </Switch>
      </HashRouter>
      {userFbData ? (
        <>
          <CategoryRouter />
        </>
      ) : null}
    </div>
  );
};

export default App;
