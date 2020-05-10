import React, { Component } from "react";
import LoadingScreen from 'react-loading-screen';

// importing styles
// import './loginSignUpScreen.css';
import '../../Styles.css';

// importing components
import LoginComponent from '../../uiComponents/LoginComponent/loginComponent.js';
import SignUpComponent from '../../uiComponents/SignUpComponent/SignUpComponent.js';
import ForgotPassword from '../../uiComponents/ForgotPassword/forgotPassword.js';

// importing firebase
import firebase from "../../configs/firebase";

class LoginSignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            screen: "login",
        }
    }


    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.displayName && this.state.isLoading) {
                window.location.href ="/play"
                return;
            }

            if (!user) {
                console.log('user not logged in')
                this.setState({
                    isLoading: false,
                })
            }
        })
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
            return <ForgotPassword hideForgotPassword={this.hideForgotPassword} />
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