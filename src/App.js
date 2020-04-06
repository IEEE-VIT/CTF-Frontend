import React from 'react';
import Globe from './uiComponents/globe/globe.js';

// importing Screens
import HomeScreen from './screens/HomeScreen/homeScreen.js';

import './App.css';

class App extends React.Component{

  render(){
    return(
        <HomeScreen />
    );
  }
}

export default App;
