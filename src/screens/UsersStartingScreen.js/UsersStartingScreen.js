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
            if (user) {
                window.location.href ="/play"
                return;
            }
            console.log('user not logged in')
            this.setState({
                isLoading: false,
            })
        })
    }

    toggleLoading = () => {
        const { isLoading } = this.state;
        this.setState({
            isLoading: !isLoading
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
                    <LoginComponent toggleLoading={this.toggleLoading} switchScreen={this.switchScreen}/>
                    :
                    <SignUpComponent toggleLoading={this.toggleLoading} switchScreen={this.switchScreen}/>
                }
            </div>
        );
    }
}

export default LoginSignUpScreen;