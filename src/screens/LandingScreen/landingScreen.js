import React, { Component } from 'react';
import 'firebase';

// importing StyleSheets
import './landingScreen.css';
import '../../Styles.css';

import { pingServer } from '../../utils/userHelperFuncs';

class LandingScreen extends Component {

    componentDidMount() {
        pingServer();
    }

    render() {
        return (
            <div className="mainContainer">
                <img className="ctfLogo" src={require('../../assets/ctfLogo.png')} alt="CTF Logo" height={260} />
                <div className="button loginBtn" onClick={() => window.location.href = '/get_started'}>Play</div>
            </div>
        );
    }
}


export default LandingScreen;
