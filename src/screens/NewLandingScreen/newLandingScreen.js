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
											page: 'map'
										});
									}}
									>Info</Nav.Link>
									<Nav.Link
										onClick={() => {
										this.setState({
											page: 'history'
										});
									}}
									>History</Nav.Link>
									<Nav.Link
										onClick={() => {
										this.setState({
											page: 'contact'
										});
									}}
									>Contact</Nav.Link>
									<Nav.Link
										onClick={() => window.location.href = '/get_started'}
									>Play</Nav.Link>
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
									this.state.page === 'home'
										?
											<img src={require('../../assets/ctfLogo.png')} alt="CTF Logo" />
										:
										<p style={{"color": "white"}}>Some other page</p>
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
