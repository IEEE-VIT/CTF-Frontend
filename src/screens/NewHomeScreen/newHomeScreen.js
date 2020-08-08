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

class NewHomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state={
			page: 'map',
		};
	}

	render() {
		const {page} = this.state;
			return (
				<React.Fragment>
					<div className="newLandingScreen__main-container">
						<nav className="nav">
							<div className="nav__ctf"><img src={ctfLogo} alt=""/></div>
							<div className="nav__buttons-container">
								<div className="nav__button" style={{opacity: page === "map" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'map',
									});
								}}>Map</div>
								<div className="nav__button" style={{opacity: page === "leaderboard" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'leaderboard'
									});
								}}>Leaderboard</div>
								<div className="nav__button" style={{opacity: page === "info" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'info',
									});
								}}>Info</div>
								<div className="nav__button" style={{opacity: page === "profile" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'profile',
									});
								}}>Profile</div>
							</div>
							<div className="nav__score">Your score: 0</div>
						</nav>
						<SocialMediaIcons />
						<LandingGlobe />
					</div>
					<div className = 'landing__logo-play'>
						<div className = 'newHomeScreen__center_text'>We will be live soon!</div>
						<div className = 'newHomeScreen__center_text'>Stay tuned!</div>
					</div>
				</React.Fragment>
			);
	}
}

export default NewHomeScreen;
