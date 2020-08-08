import React, { Component } from 'react';
//import 'firebase';

// importing StyleSheets
import './newLandingScreen.css';
import '../HomeScreen/homeScreen.css';
import '../../Styles.css';

import {LandingGlobe} from '../../uiComponents/LandingGlobe/landingGlobe.js';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';

//Importing assets
import ctfLogo from '../../assets/CTF.svg';

class NewLandingScreen extends Component {

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
								}}>Info</div>
								<div className="nav__button" style={{opacity: page === "leaderboard" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'leaderboard'
									});
								}}>History</div>
								<div className="nav__button" style={{opacity: page === "info" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'info',
									});
								}}>Contact</div>
								<div className="nav__button" style={{opacity: page === "profile" ? 1 : 0.64}} onClick={()=>{
									this.setState({
										page: 'profile',
									});
								}}>Profile</div>
							</div>
							<div className="newLandingScreen__loginBtn" onClick={() => window.location.href = '/get_started'}>Play</div>
						</nav>
						<SocialMediaIcons />
						<LandingGlobe />
					</div>
					<div className = 'landing__logo-play'>
						<img className="ctfLogo" src={require('../../assets/ctfLogo.png')} alt="CTF Logo" height={260} />
						{
							/*
								<div className="button loginBtn" onClick={() => window.location.href = '/get_started'}>Play</div>
							*/
						}
					</div>
				</React.Fragment>
			);
	}
}


export default NewLandingScreen;
