import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import CategoryRouter from './components/Routing/CategoryRouter';
import MessageRouter from './components/Routing/MessageRouter';
import './App.global.css';
import Categories from './components/dashboard/Categories';
import UserDataRetrieval from './utils/UserDataRetrieval';

const App = () => {
  const userData = useSelector((state) => state.userData);
  UserDataRetrieval();

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/categories"
            render={(props) => <Categories {...props} />}
          />
        </Switch>
      </HashRouter>
      {userData ? (
        <>
          <CategoryRouter />
          <MessageRouter />
        </>
      ) : null}
    </div>
  );
};

export default App;
