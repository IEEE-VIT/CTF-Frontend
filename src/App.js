import React from 'react';
import Globe from './uiComponents/globe/globe.js';

// importing Screens
import HomeScreen from './screens/HomeScreen/homeScreen.js';
import Land from './screens/LandingScreen';
import Login from './screens/LoginSignUpScreen';

import './App.css';

class App extends React.Component{

  render(){
    return(
        <Login />
    );
  }
}

export default App;
