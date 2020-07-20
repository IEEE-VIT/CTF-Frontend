import React, { Component } from "react";
import LoadingScreen from 'react-loading-screen';

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

class LoginSignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            screen: "login",
        }
    }


    componentDidMount(){
        firebaseAuth.getRedirectResult()
            .then(async (result) => {
                const user = result.user;
                if (user === null) {
                    this.setState({
                        isLoading: false,
                    })
                    return;
                }
                const {isRegSuccess, wasUserRegistered} = await createUser(user.email, user.displayName, user.uid);
                if (isRegSuccess) {
                    window.location.href="/play"
                } else {
                    if (wasUserRegistered) {
                        window.location.href="/play"
                    }
                    alert("Looks like something went Wrong, Please reach out to us!")
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
            return <LoginComponent showForgotPassword={this.showForgotPassword} startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>;
        }

        if (screen === "signUp") {
            return <SignUpComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>;
        }

        if (screen === "forgot") {
            return <ForgotPassword hideForgotPassword={this.hideForgotPassword} startLoading={this.startLoading} stopLoading={this.stopLoading} />
        }

        return <LoginComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>;
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
