import React, { Component } from "react";

// importing styles
// import './loginSignUpScreen.css';
import '../../Styles.css';

// importing components
import LoginComponent from '../../uiComponents/LoginComponent/loginComponent.js';
import SignUpComponent from '../../uiComponents/SignUpComponent/SignUpComponent.js';

class LoginSignUpScreen extends Component {

    render() {
        return (
            <div className="mainContainer">
                <SignUpComponent />
            </div>
        );
    }
}

export default LoginSignUpScreen;