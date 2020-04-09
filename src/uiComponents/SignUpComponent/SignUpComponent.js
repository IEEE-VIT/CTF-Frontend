import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import LoadingScreen from 'react-loading-screen';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { checkUserEmailAndPassword, checkUsername } from '../../utils/userHelperFuncs';
import { uodateUsername } from '../../utils/firebaseHelperFuncs';

// Importing styles
import '../../Styles.css';
import './SignUpComponent.css';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    setUserName = (username) => {
        this.setState({
            username: username.target.value,
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

    onLoginSubmit = () => {
        this.props.toggleLoading();
        const { username, email, password, confirmPassword } = this.state;
        const validCreds = ( checkUserEmailAndPassword(email, password) && checkUsername(username) );
        if (!validCreds) {
            console.log("invalid credentials");
            this.props.toggleLoading();
            return;
        }

        if (confirmPassword !== password) {
            console.log("passwords don't match");
            this.props.toggleLoading();
            return;
        }

        console.log("goooooooood");
        firebase.auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().createUserWithEmailAndPassword(email, password)
            })
            .then((user) => {
                return uodateUsername(username);
            })
            .then(() => {
                console.log(firebase.auth().currentUser.displayName);
                // put data to db
            })
            .catch((err) => {
                console.log(err);
                this.props.toggleLoading();
            })
    }

    render() {
        const { username, email, password, confirmPassword } = this.state;

        return (
            <div className="loginTextColor">
                <span className="textMedium">Sign Up</span>
                <div className="inputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Username"
                        variant="outlined"
                        margin='normal'
                        color="primary"
                        InputLabelProps="textLight"
                        value={username}
                        onChange={(username) => this.setUserName(username)}
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

                    <div className="button loginBtn" onClick={() => this.onLoginSubmit()}>Sign Up</div>
                </div>
                <div className="subContainer">
                    <div className="signUpSection">
                        <span>Already have an account? </span> 
                        <div className="signUpBtn" onClick={() => this.props.switchScreen()}>Login</div>
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
