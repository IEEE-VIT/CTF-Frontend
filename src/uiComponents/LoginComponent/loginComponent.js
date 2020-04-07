import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Importing styles
import '../../Styles.css';
import './loginComponent.css';

class LoginComponent extends Component {

    render() {
        return (
            <div className="loginTextColor">
                <span className="textMedium">Login in</span>
                <div className="inputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Username"
                        variant="outlined"
                        margin='normal'
                        color="primary"
                        InputLabelProps="textLight"
                    />
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        margin='none'
                        color="primary"
                        InputLabelProps="textLight"
                    />

                    <div className="button loginBtn" onClick={() => window.location.href ="/play"}>Log In</div>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Don't have an account? </span> 
                        <div className="signUpBtn">Sign Up</div>
                    </div>
                    <div className="orText">
                        <h4>OR</h4>
                    </div>
                    <div className="googleContainer">
                        <div onClick={() => window.location.href ="/play"}>
                            <img src={require("../../assets/cg.png")} alt="Continue With Google" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
