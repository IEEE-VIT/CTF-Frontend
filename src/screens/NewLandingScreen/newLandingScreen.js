import React, { Component } from 'react';
//import 'firebase';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
			page: 'home',
		};
	}

	render() {
		const {page} = this.state;
			return (
				<React.Fragment>
					<div>
					<div className="newLandingScreen__main-container">
						<Navbar collapseOnSelect expand="lg" variant="dark" style={{"fontSize": "21px"}}>
							<div className="nav__ctf"><img src={ctfLogo} alt=""/></div>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav className="mr-auto">
								</Nav>
								<Nav>
									<Nav.Link 
										onClick={() => {
										this.setState({
											page: 'home'
										});
									}}
									>Home</Nav.Link>
									<Nav.Link 
										onClick={() => {
										this.setState({
											page: 'about'
										});
									}}
									>About</Nav.Link>
									{
										/*
									<Nav.Link
										onClick={() => {
										this.setState({
											page: 'How to Play'
										});
									}}
									>How to Play</Nav.Link>
										*/
									}
									<Nav.Link
										onClick={() => window.location.href = '/get_started'}
									>Register</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
						{
							/*
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
							*/
						}
						<SocialMediaIcons />
					</div>
					<div className = 'landing__logo-play'>
							<div className = 'ctfLogo'>
								{
									page === 'home'
									?
										<div className = "img_container">
											<img src={require('../../assets/ctfLogo.png')} alt="CTF Logo" style={{"marginTop": "-30px"}}/>
											<div className="newLandingScreen__loginBtn" onClick={() => window.location.href = '/get_started'}>Register</div>
											{/* <div className="button loginBtn" onClick={() => window.location.href = '/get_started'}>Register</div> */}
										</div>
									:	
									page === 'about'
									?
										<div className="newLandingScreen__about">
											<h3 style={{"color": "white"}}>About</h3>
											<p style={{"color": "white"}, {width:"40%"}}>
												IEEE-VIT presents CTF-Conquer the World. The questions will be spread across the globe, players will solve these questions and collect flags from each country. The first player to capture all the flags gets a chance to win exciting prices. Capture the Flag (CTF) is a special kind of information security competitions. There are a few types of CTFs, this one being a Jeopardy-style CTF. It shall include questions from a variety of categories like Web, Crypto, Forensic, Binary, etc. 
											</p>
										</div>
									:
									page === 'How to Play'
									?
										<div>
											<h3 style={{"color": "white"}}>How to Play</h3>
											<p></p>
										</div>
									:
										<p style={{"color": "white"}}>Contact</p>
								}

							</div>
							<LandingGlobe />
						{
							/*
								<div className="button loginBtn" onClick={() => window.location.href = '/get_started'}>Play</div>
								<p style={{"fontSize": "500px", "color": "white", "zIndex": "100000", "width": "100vw", "height": "100vh"}}>CTF CTF CTF</p>
							*/
						}
						</div>
					</div>
				</React.Fragment>
			);
	}
}

export default NewLandingScreen;
