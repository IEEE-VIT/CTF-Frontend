import React from 'react';
import LoadingScreen from 'react-loading-screen';

import Globe from '../../uiComponents/globe/globe';
import './homeScreen.css';
import SocialMediaIcons from '../../uiComponents/socialMediaIcons/socialMediaIcons.js';
import LeaderBoard from '../LeaderBoard/leaderBoard.js';
import QuestionModal from '../../uiComponents/questionModal/questionModal.js';
import InfoScreen from '../InfoScreen/infoScreen.js';
import ProfileScreen from '../ProfileScreen/profileScreen.js';

import ctfLogo from '../../assets/CTF.svg';

// importing firebase
import firebase from '../../configs/firebase';

class HomeScreen extends React.Component {

	constructor() {
		super();
		this.state={
			page: 'map',
			isOpen: false,
			isLoading: true,
			user: '',
		};
	}

	componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                window.location.href ="/"
                return;
            }
            console.log('user logged in')
            this.setState({
				isLoading: false,
				user: user,
            })
        })
	}

	openLoading = () => {
		this.setState({
			isLoading: true,
		})
	}
	
	closeLoading = () => {
		this.setState({
			isLoading: false,
		})
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
		const { isLoading } = this.state;

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

		return (
			<div>
				<nav className="nav">
					<div className="nav__ctf"><img src={ctfLogo} alt=""/></div>
					<div className="nav__buttons-container">
						<div className="nav__button" onClick={()=>{
							this.setState({
								// isOpen: true
								page: 'map'
							});
						}}>Map</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'leaderboard'
							});
						}}>Leaderboard</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'info'
							});
						}}>Information</div>
						<div className="nav__button" onClick={()=>{
							this.setState({
								page: 'profile'
							});
						}}>Profile</div>
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
					<ProfileScreen openLoading={this.openLoading} closeLoading={this.closeLoading} />
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
