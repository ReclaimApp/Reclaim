import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Download from './components/onboarding/Download';
import Drop from './components/onboarding/Drop';
import Landing from './components/onboarding/Landing';
import CategoryRouter from './components/Routing/CategoryRouter';
import MessageRouter from './components/Routing/MessageRouter';
import './App.global.css';
import Categories from './components/dashboard/Categories';

const App = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/download"
            render={(props) => <Download {...props} />}
          />
          <Route exact path="/drop" render={(props) => <Drop {...props} />} />
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
