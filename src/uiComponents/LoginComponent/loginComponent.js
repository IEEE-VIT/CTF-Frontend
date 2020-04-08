import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import LoadingScreen from 'react-loading-screen';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { checkUserEmailAndPassword } from '../../utils/userHelperFuncs';

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
        this.props.toggleLoading();
        const { email, password } = this.state;
        const validCreds = checkUserEmailAndPassword(email, password);
        if (!validCreds) {
            console.log("invalid credentials");
            this.props.toggleLoading();
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
                this.props.toggleLoading();
            })
    }

    render() {
        const { email, password } = this.state;

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
