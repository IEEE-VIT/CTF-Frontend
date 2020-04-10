import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { checkUserEmailAndPassword, checkName } from '../../utils/userHelperFuncs';
import { updateName, googleOAuth } from '../../utils/firebaseHelperFuncs';

// importing components
import { toastError } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './SignUpComponent.css';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    setname = (name) => {
        this.setState({
            name: name.target.value,
        })
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

    setConfirmPassword = (confirmPassword) => {
        this.setState({
            confirmPassword: confirmPassword.target.value
        })
    }

    onSignUpSubmit = () => {
        this.props.startLoading();
        const { name, email, password, confirmPassword } = this.state;

        if ([name.trim(), email.trim(), password.trim(), confirmPassword.trim()].includes("")) {
            this.props.stopLoading();
            toastError("Looks like you forgot to fill some fields.");
            return;
        }

        if (!checkName(name)) {
            this.props.stopLoading();
            toastError("Hey make sure your name has only Alphanumeric characters.");
            return;
        }

        if (!checkUserEmailAndPassword(email, password)) {
            this.props.stopLoading();
            toastError("Hey make sure your Email is correct and password has only Alphanumeric characters.");
            return;
        }

        if (confirmPassword !== password) {
            this.props.stopLoading();
            toastError("Hey your password and confirm password don't match.");
            return;
        }

        console.log("goooooooood");
        firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().createUserWithEmailAndPassword(email, password)
            })
            .then((user) => {
                return updateName(name);
            })
            .then(() => {
                console.log(firebase.auth().currentUser.displayName);
                // put data to db
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
            })
    }

    onGoogleAuth = () => {
        this.props.startLoading();
        googleOAuth()
            .then((user) => {
                console.log(user);
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
            })
    }

    render() {
        const { name, email, password, confirmPassword } = this.state;

        return (
            <div className="loginTextColor">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <span className="textMedium">Sign Up</span>
                <div className="inputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Your name"
                        variant="outlined"
                        margin='normal'
                        color="primary"
                        InputLabelProps="textLight"
                        value={name}
                        onChange={(name) => this.setname(name)}
                        required
                        type='text'
                        autoFocus
                    />
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
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Confirm Password"
                        variant="outlined"
                        margin='none'
                        color="primary"
                        InputLabelProps="textLight"
                        value={confirmPassword}
                        onChange={(confirmPassword) => this.setConfirmPassword(confirmPassword)}
                        required
                        type='text'
                    />

                    <div className="button loginBtn" onClick={() => this.onSignUpSubmit()}>Sign Up</div>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Already have an account? </span> 
                        <div className="signUpBtn" onClick={() => this.props.switchScreen()}>Login</div>
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
