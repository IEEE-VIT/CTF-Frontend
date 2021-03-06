import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Globe from './uiComponents/globe/globe.js';

// Importing Screens
import LandingScreen from './screens/LandingScreen/landingScreen.js';
import UsersStartingScreen from './screens/UsersStartingScreen.js/UsersStartingScreen.js';
import HomeScreen from './screens/HomeScreen/homeScreen.js';
import {Globe2} from './uiComponents/globe2/globe2.js';

import './App.css';

const AppRouter=()=> {
  return (
    <div>
      {/* <LandingScreen /> */}
      <BrowserRouter>
        <Switch>
          {/* <Route path="/signup" component={SignUpPage} exact={true}/> */}
          <Route path='/' component={LandingScreen} exact={true}  />
          <Route path="/get_started" component={UsersStartingScreen} exact={true}/>
          <Route path='/play' component={HomeScreen} exact={true}  />
					<Route path='/globe2' component={Globe2} exact={true} />
          {/* <Route component={Error404Page} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
