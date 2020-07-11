import React from 'react';
import LoadingScreen from 'react-loading-screen';

import {Globe2} from '../../uiComponents/globe2/globe2.js';
import './homeScreen.css';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';
import ChangeName from '../../uiComponents/ChangeName/ChangeName';
import LeaderBoard from '../LeaderBoard/leaderBoard.js';
import QuestionModal from '../../uiComponents/questionModal/questionModal.js';
import InfoScreen from '../InfoScreen/infoScreen.js';
import ProfileScreen from '../ProfileScreen/profileScreen.js';
import CorrectAnswer from '../../uiComponents/CorrectAnswer/CorrectAnswer.js'

import ctfLogo from '../../assets/CTF.svg';

// importing firebase
import firebase from '../../configs/firebase';

// importing utils
import {getQuestions, getUserProfile} from '../../utils/userHelperFuncs';
import MobileView from '../../uiComponents/MobileView/MobileView.js';

class HomeScreen extends React.Component {

	constructor() {
		super();
		this.state={
			page: 'map',
			isOpen: false,
			isLoading: true,
			isOpenAnswer: false,
			questions: [],
			user: '',
			clickedQuestion: '',
			clickedQuestionId: '',
		};
	}

	componentDidMount(){
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
				window.location.href ="/"
				return;
			}
			try {
				const userProfile = await getUserProfile(user.uid);
				const questions = await getQuestions();
				this.setState({
					isLoading: false,
					questions,
					user: user,
					userProfile,
				});
			} catch (err) {
				alert("Oops their was an error and re had to sign you out! Please login again");
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

	showQuestionModal=(point)=>{
		this.setState({
			isOpen: true
		});
		this.setState({
			clickedQuestion: this.state.questions[point['index']]['data'],
			clickedQuestionId: this.state.questions[point['index']].id,
		});
		// console.log(this.state.questions[point['index']]['data']);
	}

	startHomeScreenLoading = () => {
		this.setState({
			isLoading: true,
		});
	}

	closeModalAnswer = () => {
		this.setState({
			isOpenAnswer: false,
		});
	}

	onAnswerCorrect = async () => {
		this.startHomeScreenLoading();
		const {user} = this.state;
		const userProfile = await getUserProfile(user.uid);
		const questions = (await getQuestions());
		this.setState({
			isLoading: false,
			questions,
			userProfile,
			isOpenAnswer: true,
		});
	}

	setHomeScreenLoading = (value) => {
		this.setState({
			isLoading: value,
		});
	}

	render() {
		const { isLoading, userProfile, page } = this.state;
		
		if(window.screen.width <= 768) {
			return (
				<MobileView />
			);
		}

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
						<div className="nav__button" style={{opacity: page === "map" ? 1 : 0.64}} onClick={()=>{
							this.setState({
								isOpen: false,
								page: 'map',
							});
						}}>Map</div>
						<div className="nav__button" style={{opacity: page === "leaderboard" ? 1 : 0.64}} onClick={()=>{
							this.setState({
								isOpen: false,
								page: 'leaderboard'
							});
						}}>Leaderboard</div>
						<div className="nav__button" style={{opacity: page === "info" ? 1 : 0.64}} onClick={()=>{
							this.setState({
								isOpen: false,
								page: 'info',
							});
						}}>Information</div>
						<div className="nav__button" style={{opacity: page === "profile" ? 1 : 0.64}} onClick={()=>{
							this.setState({
								isOpen: false,
								page: 'profile',
							});
						}}>Profile</div>
					</div>
					<div className="nav__score">Your score: {userProfile.points}</div>
				</nav>
				<Globe2 userProfile={this.state.userProfile} questions={this.state.questions} showQuestionModal={this.showQuestionModal}/>
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
				<QuestionModal onAnswerCorrect={this.onAnswerCorrect} setHomeScreenLoading={this.setHomeScreenLoading} hindUsed={false} isOpen={this.state.isOpen} question={this.state.clickedQuestion} qid={this.state.clickedQuestionId} handleAnswerSubmit={this.handleAnswerSubmit} closeModal={this.closeModal}/>
				<CorrectAnswer isOpenAnswer={this.state.isOpenAnswer} closeModalAnswer={this.closeModalAnswer} />
				<SocialMediaIcons />
			</div>
		);
	}
}

export default HomeScreen;
