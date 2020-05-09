import React from 'react';
import LoadingScreen from 'react-loading-screen';

import Globe from '../../uiComponents/globe/globe.js';
import {Globe2} from '../../uiComponents/globe2/globe2.js';
import './homeScreen.css';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';
import ChangeName from '../../uiComponents/ChangeName/ChangeName';
import LeaderBoard from '../LeaderBoard/leaderBoard.js';
import QuestionModal from '../../uiComponents/questionModal/questionModal.js';
import InfoScreen from '../InfoScreen/infoScreen.js';
import ProfileScreen from '../ProfileScreen/profileScreen.js';

import ctfLogo from '../../assets/CTF.svg';

// importing firebase
import firebase from '../../configs/firebase';

// importing utils
import {getQuestions, getUserProfile} from '../../utils/userHelperFuncs';

class HomeScreen extends React.Component {

	constructor() {
		super();
		this.state={
			page: 'map',
			isOpen: false,
			isLoading: true,
			questions: [],
			user: '',
		};
	}

	componentDidMount(){
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href ="/"
                return;
						}
						const userProfile = await getUserProfile(user.uid);
						const questions = (await getQuestions());
						console.log(questions);
						this.setState({
							isLoading: false,
							questions,
							user: user,
							userProfile,
						});
        });
	}

	handleAnswerSubmit=()=>{
		console.log('Trying to handle answer submit');
	}

	closeModal=()=>{
		this.setState({
			isOpen: false
		});
	}

	showQuestionModal=()=>{
		this.setState({
			isOpen: true
		});	
		// console.log('something '+questionNumber);
	}

	render() {
		const { isLoading, userProfile } = this.state;

		if (isLoading) {
			return (
					<LoadingScreen
							loading={isLoading}
							bgColor='black'
							spinnerColor='blue'
							logoSrc={require('../../assets/ctfLogo.png')}
					/> 
			);
		}

		//uncomment when the backend team updates the route
		if (userProfile.defaultName) {
			return (
				<div className="mainContainer">
					<ChangeName user={this.state.user} />
				</div>
			);
		}

		return (
			<div>
				<nav className="nav">
					<div className="nav__ctf"><img src={ctfLogo} alt=""/></div>
					<div className="nav__buttons-container">
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'map',
							});
						}}>Map</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'leaderboard'
							});
						}}>Leaderboard</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'info',
							});
						}}>Information</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'profile',
							});
						}}>Profile</div>
					</div>
					<div className="nav__score">Your score: {userProfile.points}</div>
				</nav>
				<Globe2 questions={this.state.questions} showQuestionModal={this.showQuestionModal}/>
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
