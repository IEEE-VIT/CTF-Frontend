import React from 'react';
import Globe from './uiComponents/globe/globe.js';

import './App.css';

// importing screens
import LoginSignUpScreen from './screens/LoginSignUpScreen';

class App extends React.Component{

  render(){
    return(
      <div> 
        <LoginSignUpScreen />
      </div>
    );
  }
}

export default App;