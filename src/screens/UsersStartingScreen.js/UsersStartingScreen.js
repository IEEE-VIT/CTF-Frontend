import React, { Component } from "react";
import LoadingScreen from 'react-loading-screen';

// importing styles
// import './loginSignUpScreen.css';
import '../../Styles.css';

// importing components
import LoginComponent from '../../uiComponents/LoginComponent/loginComponent.js';
import SignUpComponent from '../../uiComponents/SignUpComponent/SignUpComponent.js';

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
        })
    }

    render() {
        const { isLoading, screen } = this.state;

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
                {
                    screen === "login"
                    ?
                    <LoginComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>
                    :
                    <SignUpComponent startLoading={this.startLoading} stopLoading={this.stopLoading} switchScreen={this.switchScreen}/>
                }
            </div>
        );
    }
}

export default LoginSignUpScreen;