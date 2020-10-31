import React, { Component, Fragment } from "react";
import LoadingScreen from 'react-loading-screen';
import cookie from 'react-cookies';

// importing styles
// import './loginSignUpScreen.css';
import '../../Styles.css';


// import utils
import { createUser } from '../../utils/userHelperFuncs';

// importing components
import LoginComponent from '../../uiComponents/LoginComponent/loginComponent.js';
import SignUpComponent from '../../uiComponents/SignUpComponent/SignUpComponent.js';
import ForgotPassword from '../../uiComponents/ForgotPassword/forgotPassword.js';

// importing firebase
import {firebaseAuth} from "../../configs/firebase";

// importing components
import { toastError } from '../../uiComponents/toasts/toasts.js';

//// create a variable to store the component instance
//let recaptchaInstance;
// 
//// manually trigger reCAPTCHA execution
//const executeCaptcha = function () {
//	return new Promise((resolve, _) => {
//  	recaptchaInstance.execute();
//		resolve();
//	});
//};

class LoginSignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            screen: "signUp",
            token: '',
						verified: false,
        }
    }

    //verifyCallback = (token) => {
    //    if (token) {
    //        this.setState({token});
    //        this.setState({verified: true});
    //    }
    //    else {
    //        toastError("ReCaptcha verification failed!");
    //    }
    //}

    //expiredCallback = () => {
    //    this.setState({token: "", verified: false});
    //    toastError("Hey! Your reCaptcha expired, please reload this page before signing up. We are sorry for the inconvenience caused.")
    //}

		updateToken= (token) => {
			this.setState({
				token: token
			});
			cookie.save('token', token, { path: '/get_started' });
		}

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(async (user) => {
					if(user!=null) {
						window.location.href ="/play"
						return;
					}
				});
				 firebaseAuth.getRedirectResult()
					 .then(async (result) => {
						 const user = result.user;
						 if (user === null) {
							 this.setState({
								 isLoading: false,
							 })
							 return;
						 } 
						 let token = cookie.load('token');
						 const {isRegSuccess, wasUserRegistered} = await createUser(user.email, user.displayName, user.uid, token);
						 cookie.remove('token', { path: '/get_started' });
						 if (isRegSuccess) {
							 window.location.href="/play"
						 } else {
							 if (wasUserRegistered) {
								 window.location.href="/play"
							 }
						 }
						 return;
					 })
				.catch((err) => {
					console.log("Redirect Error: ", err);
					this.setState({
						isLoading: false,
					})
					toastError(err.message);
				});

			const user = firebaseAuth.currentUser;
			if (user && user.displayName && this.state.isLoading) {
				window.location.href ="/play"
				return;
			}
		}

	startLoading = () => {
		this.setState({
			isLoading: true,
		})
	}

	stopLoading = () => {
		this.setState({
			isLoading: false,
		})
	}

	switchScreen = () => {
		const { screen } = this.state;
		if (screen === "login") {
			this.setState({
				screen: "signUp"
			});
			return;
		}
		this.setState({
			screen: "login"
		});
	}

	showForgotPassword = () => {
		this.setState({
			screen: "forgot",
		});
	}

	hideForgotPassword = () => {
		this.setState({
			screen: "login",
		});
	}

	renderScreen = () => {
		const { screen } = this.state;

		if (screen === "login") {
			return (
				<React.Fragment>
					<LoginComponent showForgotPassword={this.showForgotPassword} startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>
				</React.Fragment>
			);
		}

		if (screen === "signUp") {
			return (
				<React.Fragment>
					<SignUpComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen} updateToken={this.updateToken}/>
				</React.Fragment>
			);
		}

		if (screen === "forgot") {
			return (
				<React.Fragment>
					<ForgotPassword hideForgotPassword={this.hideForgotPassword} startLoading={this.startLoading} stopLoading={this.stopLoading} />
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<SignUpComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen} updateToken={this.updateToken}/>
			</React.Fragment>
		);
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
			<div className="mainContainer">
				{ this.renderScreen() }
			</div>
		);
	}
}

export default LoginSignUpScreen;
