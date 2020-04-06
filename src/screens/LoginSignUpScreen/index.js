import React, { Component } from "react";

// importing styles
import './styles.css';
import '../../Styles.css';

// importing components
import LoginComponent from '../../components/LoginComponent';

class LoginSignUpScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mainContainer">
                <LoginComponent />
            </div>
        );
    }
}

export default LoginSignUpScreen;