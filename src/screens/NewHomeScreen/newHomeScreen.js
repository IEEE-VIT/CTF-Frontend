import React, { Component } from 'react';
//import 'firebase';

// importing StyleSheets
import './newHomeScreen.css';
import '../HomeScreen/homeScreen.css';
import '../../Styles.css';

import {LandingGlobe} from '../../uiComponents/LandingGlobe/landingGlobe.js';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';

//Importing assets
import ctfLogo from '../../assets/CTF.svg';

import firebase, {firebaseAuth} from '../../configs/firebase';

class NewHomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state={
			page: 'map',
		};
	}

    onLogOut = () => {
        this.setState({
            isLoading: true,
        });
        firebase.auth().signOut()
            .then((resp) => {
                console.log(resp);
                window.location.href ="/"
                return;
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
                return;
            })
    }
	
    onLogOut = () => {
        this.setState({
            isLoading: true,
        });
        firebase.auth().signOut()
            .then((resp) => {
                console.log(resp);
                window.location.href ="/"
                return;
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
                return;
            })
    }

	render() {
		const {page} = this.state;
			return (
				<React.Fragment>
					<div className="newLandingScreen__main-container">
						<nav className="newHomePage__nav">
							<div className="newHomePage__nav__ctf"><img src={ctfLogo} alt=""/></div>
						</nav>
                        {/* <LandingGlobe /> */}
                        <div className = 'landing__logo-play'>
                            <div className = 'newHomeScreen__center_text'>Going live on 31st October at 01:30 PM IST till 01:30 PM on 1st November IST</div>
                            <div className = 'newHomeScreen__center_text'>Stay tuned!</div>
                            <div className="button loginBtn" onClick={() => this.onLogOut()}>Log Out</div>
                        </div>
						<SocialMediaIcons />
					</div>
				</React.Fragment>
			);
	}
}

export default NewHomeScreen;
