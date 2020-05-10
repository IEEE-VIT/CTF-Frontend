import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing firebase
import firebase from '../../configs/firebase';

// importing components
import { toastError, toastSuccess } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './forgotPassword.css';

class LoginComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
        }
    }

    setEmail = (email) => {
        this.setState({
            email: email.target.value
        })
    }

    sendPasswordResetEmail = () => {
        const {email} = this.state;
        this.props.startLoading();

        if (email === '') {
            return toastError("Please provide an email!");
        }

        firebase.auth().sendPasswordResetEmail(email)
            .then((resp) => {
                this.props.stopLoading();
                return toastSuccess("Hey! a password reset email is on it's way. Check your email");
            })
            .catch((err) => {
                console.log(err);
                this.props.stopLoading();
                if (err.code === "auth/user-not-found") {
                    return toastError("Sorry that email Id is not registered with us. Try signing up!");
                }
                return toastError(err.message);
            })
    }

    render() {
        const { email } = this.state;

        return (
            <div className="loginTextColor">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <span className="textMedium">Forgot Password? Reset it here</span>
                <div className="inputContainer">
                    <TextField
                        id='outlined-basic'
                        fullWidth={true}
                        label="Registered Email Id"
                        variant="outlined"
                        margin='none'
                        color="primary"
                        InputLabelProps="textLight"
                        value={email}
                        onChange={(e) => this.setEmail(e)}
                        required
                        type='email'
                    />
                    <div style={{alignSelf: 'flex-end', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => this.props.hideForgotPassword()}>
                    Login Instead!
                    </div>

                    <div className="button loginBtn" onClick={() => this.sendPasswordResetEmail()} >Reset</div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
