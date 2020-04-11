import React, { Component } from 'react';
import 'firebase';

// importing StyleSheets
import './landingScreen.css';
import '../../Styles.css';

import { createUser, getUserProfile } from '../../utils/userHelperFuncs';

class LandingScreen extends Component {

    componentDidMount() {
        createUser("sdfd", "sdf", "sfsdf");
        getUserProfile();
    }

    render() {
        return (
            <div className="mainContainer">
                <img className="ctfLogo" src={require('../../assets/ctfLogo.png')} alt="CTF Logo" height={260} />
                <div className="button loginBtn" onClick={() => window.location.href = '/getStarted'}>Play</div>
            </div>
        );
    }
}


export default LandingScreen;
