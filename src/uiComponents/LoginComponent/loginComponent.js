import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { checkUserEmailAndPassword } from '../../utils/userHelperFuncs';
import { googleOAuth } from '../../utils/firebaseHelperFuncs';

// importing components
import { toastError } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './loginComponent.css';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
        }
    }

    setEmail = (email) => {
        this.setState({
            email: email.target.value
        })
    }

    setPassword = (password) => {
        this.setState({
            password: password.target.value
        })
    }

    onLoginSubmit = () => {
        this.props.startLoading();
        const { email, password } = this.state;

        if ([email.trim(), password.trim()].includes("")) {
            this.props.stopLoading();
            toastError("Looks like you forgot to fill some fields.");
            return;
        }
        
        if (!checkUserEmailAndPassword(email, password)) {
            this.props.stopLoading();
            toastError("Hey make sure your Email is correct and password has only Alphanumeric characters.");
            return;
        }

        console.log("goooooooood");
        firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, password)
            })
            .then((user) => {
                console.log(user);
                window.location.href = "/play";
                return;
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
                return;
            })
    }

    onGoogleAuth = () => {
        this.props.startLoading();
        googleOAuth()
            .then((user) => {
                console.log(user);
                return;
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
            })
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="loginTextColor">
                <ToastContainer />
                <span className="textMedium">Login in</span>
                <div className="inputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Email"
                        variant="outlined"
                        margin='normal'
                        color="primary"
                        InputLabelProps="textLight"
                        value={email}
                        onChange={(email) => this.setEmail(email)}
                        required
                        type='email'
                        autoFocus
                    />
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        margin='none'
                        color="primary"
                        InputLabelProps="textLight"
                        value={password}
                        onChange={(password) => this.setPassword(password)}
                        required
                        type='password'
                    />

                    <div className="button loginBtn" onClick={() => this.onLoginSubmit()}>Log In</div>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Don't have an account? </span> 
                        <div className="signUpBtn" onClick={() => this.props.switchScreen()}>Sign Up</div>
                    </div>
                    <div className="orText">
                        <h4>OR</h4>
                    </div>
                    <div className="googleContainer" onClick={() => this.onGoogleAuth()}>
                        <img src={require("../../assets/cg.png")} alt="Continue With Google" />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
