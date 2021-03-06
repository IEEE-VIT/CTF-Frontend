import React, { Component } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing firebase
import firebase, {firebaseAuth} from '../../configs/firebase';

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
            showPassword: false,
        }
    }

    toggleShowPassword = () => {
        const {showPassword} = this.state;
        this.setState({
            showPassword: !showPassword,
        });
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
        firebaseAuth
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => firebaseAuth.signInWithEmailAndPassword(email, password))
            .then(() => {
                const isVerified = firebaseAuth.currentUser.emailVerified;
                if (isVerified === false) {
                    firebaseAuth.currentUser.sendEmailVerification();
                    toastError("Looks like you didn't verify your email. We sent another verification link. Please verify first!!!")
                    return this.props.stopLoading();
                }
                return window.location.href = "/play";
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                toastError(err.message);
                return;
            })
    }

    render() {
        const { email, password, showPassword } = this.state;

        return (
            <div className="loginTextColor">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <span className="textMedium">Login</span>
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
                    <div style={{alignSelf: 'flex-end', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => this.props.showForgotPassword()}>
                    Forgot Password?
                    </div>

                    <div className="button loginBtn" onClick={() => this.onLoginSubmit()}>Log In</div>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Don't have an account? </span>
                        <div className="signUpBtn" onClick={() => this.props.switchScreen()}> Sign Up</div>
                    </div>
                    <div className="orText">
                        <h4>OR</h4>
                    </div>
                    <div className="googleContainer" onClick={() => {
                        this.props.startLoading();
                        googleOAuth();
                    }}>
                        <img src={require("../../assets/cg.png")} alt="Continue With Google" />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
