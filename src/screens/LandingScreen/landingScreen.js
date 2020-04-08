import React, { Component } from 'react';
import 'firebase';

// importing StyleSheets
import './landingScreen.css';
import '../../Styles.css';

class LandingScreen extends Component {

    render() {
        return (
            <div className="mainContainer">
                <img className="ctfLogo" src={require('../../assets/ctfLogo.png')} alt="CTF Logo" height={260} />
                <button className='platBtn textLight' onClick={() => window.location.href ="/login"}>Play</button>
            </div>
        );
    }
}


export default LandingScreen;
