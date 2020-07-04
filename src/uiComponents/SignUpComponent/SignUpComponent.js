import React, { Component } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recaptcha from 'react-recaptcha';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { checkUserEmailAndPassword, checkName, createUser } from '../../utils/userHelperFuncs';
import { updateName, googleOAuth } from '../../utils/firebaseHelperFuncs';

// importing components
import { toastError } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './SignUpComponent.css';

class SignUpComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            token: '',
						verified: false,
        }
				this.verifyCallback = this.verifyCallback.bind(this);
    }

    toggleShowPassword = () => {
        const {showPassword} = this.state;
        this.setState({
            showPassword: !showPassword,
        });
    }

    setName = (name) => {
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

    verifyCallback=(token)=>{
        if (token) {
            this.setState({token});
						this.setState({verified: true});
        }
        else {
            toastError("ReCaptcha verification failed!");
        }
    }

    onSignUpSubmit = () => {
        this.props.startLoading();
        const { name, email, password, confirmPassword, token } = this.state;


        if ([name.trim(), email.trim(), password.trim(), confirmPassword.trim()].includes("")) {
            this.props.stopLoading();
            toastError("Looks like you forgot to fill some fields.");
            return;
        }

        if (!this.state.verified) {
            this.props.stopLoading();
            toastError("Please confirm you are a human");
            return;
        }

        if (!checkName(name)) {
            console.log(name);
            this.props.stopLoading();
            toastError("Hey make sure your name has only Alphanumeric characters and contains 6 to 40 characters.");
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

        firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(async () => {
                return firebase.auth().createUserWithEmailAndPassword(email, password)                
            })
            .then(async () => {
                const {email, uid} = firebase.auth().currentUser;
                createUser(email, name, uid)
                    .then(async () => {
                        await updateName(name);
                        window.location.href = "/play"
                    })
                    .catch((err) => {
                        const user = firebase.auth().currentUser;
                        user.delete();
                        this.props.stopLoading();
                        toastError(err.message);
                    })
                
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
            })
    }

    onGoogleAuth = () => {
        googleOAuth()
            .then(async (user) => {
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
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
            })
    }

    render() {
        const { name, email, password, confirmPassword, showPassword } = this.state;

        return (
            <div className="signUpContainer">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <div className="g-recaptcha" id="g-recaptcha"></div>
                <span className="textMedium">Sign Up</span>
                <div className="signUpInputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Your name"
                        variant="outlined"
                        margin='normal'
                        color="primary"
                        InputLabelProps="textLight"
                        value={name}
                        onChange={(name) => this.setName(name)}
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
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => this.toggleShowPassword()}
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
                        type='password'
                    />
                    <div className="button loginBtn" onClick={() => this.onSignUpSubmit()}>Sign Up</div>
                </div>
                <div className="subContainer">
                    <Recaptcha
                        sitekey={process.env.REACT_APP_SITEKEY}
                        render="explicit"
                        // size="invisible"
                        verifyCallback={this.verifyCallback}
                        onloadCallback={(res)=>{
                            console.log("Loaded captcha")
                        }} 
                    />
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

export default SignUpComponent;
