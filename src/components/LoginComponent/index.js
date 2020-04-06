import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// importing styles
import '../../Styles.css';
import './styles.css';

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

                    <a className="button loginBtn" >Log In</a>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Don't have an account? </span> 
                        <a className="signUpBtn">Sign Up</a>
                    </div>
                    <div className="orText">
                        <h4>OR</h4>
                    </div>
                    <div className="googleContainer">
                        <a onClick={() => console.log("Pressed")}>
                            <img src={require("../../assets/cg.png")} alt="Continue With Google" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
