import React from 'react';

import Globe from '../../uiComponents/globe/globe';
import './homeScreen.css';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';
import LeaderBoard from '../LeaderBoard/leaderBoard.js';
import QuestionModal from '../../uiComponents/questionModal/questionModal.js';
import InfoScreen from '../InfoScreen/infoScreen.js';
import ProfileScreen from '../ProfileScreen/profileScreen.js';

import ctfLogo from '../../assets/CTF.png';
// const ctf =require('../../assets/CTF.png');

class HomeScreen extends React.Component {

	constructor() {
		super();
		this.state={
			'page': 'leaderboard',
			// 'page': 'info',
			// 'page': 'profile',
			isOpen: false
		};
	}

	handleAnswerSubmit=()=>{
		console.log('Trying to handle answer submit');
	}

	closeModal=()=>{
		this.setState({
			isOpen: false
		});
	}

	render() {
		return (
			<div>
				<nav className="nav">
					<div className="nav__ctf"><img src={ctfLogo} alt=""/></div>
					<div className="nav__buttons-container">
						<div className="nav__button" onClick={()=>{
							this.setState({
								isOpen: true
							});
						}}>Map</div>
						<div className="nav__button">Leaderboard</div>
						<div className="nav__button">Information</div>
						<div className="nav__button">Profile</div>
					</div>
					<div className="nav__score">Your score: 100</div>
				</nav>
				<Globe />
				{
					this.state.page==='leaderboard'
					?
					<LeaderBoard />
					:
					this.state.page==='info'
					?
					<InfoScreen />
					:
					this.state.page==='profile'
					?
					<ProfileScreen />
					:
					null
				}
				<QuestionModal isOpen={this.state.isOpen} handleAnswerSubmit={this.handleAnswerSubmit} closeModal={this.closeModal}/>
				<SocialMediaIcons />
			</div>
		);
	}
}

export default HomeScreen;
