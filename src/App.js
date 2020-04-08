import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Globe from './uiComponents/globe/globe.js';

// Importing Screens
import LandingScreen from './screens/LandingScreen/landingScreen.js';
import UsersStartingScreen from './screens/UsersStartingScreen.js/UsersStartingScreen.js';
import HomeScreen from './screens/HomeScreen/homeScreen.js';

import './App.css';

const AppRouter=()=> {
  return (
    <div>
      {/* <LandingScreen /> */}
      <BrowserRouter>
        <Switch>
          {/* <Route path="/signup" component={SignUpPage} exact={true}/> */}
          <Route path='/' component={LandingScreen} exact={true}  />
          <Route path="/getStarted" component={UsersStartingScreen} exact={true}/>
          <Route path='/play' component={HomeScreen} exact={true}  />
          {/* <Route component={Error404Page} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;