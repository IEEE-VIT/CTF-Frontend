import React from 'react';
import Globe from './uiComponents/globe/globe.js';

// importing Screens
import LandingScreen from './screens/LandingScreen';

import './App.css';


class App extends React.Component{

  render(){
    return(
      <LandingScreen />
    );
  }
}

export default App;