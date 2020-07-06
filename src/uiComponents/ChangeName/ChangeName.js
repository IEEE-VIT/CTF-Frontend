import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Recaptcha from 'react-recaptcha';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { updateUserObject, reCaptchaCheck } from '../../utils/userHelperFuncs';

// importing components
import { toastError, toastSuccess } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './ChangeName.css';

// create a variable to store the component instance
let recaptchaInstance;
 
// manually trigger reCAPTCHA execution
const executeCaptcha = function () {
  recaptchaInstance.execute();
};

class ChangeName extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            user: props.user,
            token: '',
			verified: false,
        }
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            executeCaptcha();
        }, 2000);
        toastSuccess("Just a few more steps, Setup a username to start your journey!");
    }

    verifyCallback = (token) => {
        if (token) {
            this.setState({token});
            this.setState({verified: true});
            console.log('Token: ', token);
        }
        else {
            toastError("ReCaptcha verification failed!");
        }
    }

    expiredCallback = () => {
        console.log('################## Token expired #################')
        this.setState({token: "", verified: false});
        toastError("Hey! Your reCaptcha expired, please reload this page before signing up. We are sorry for the inconvenience caused.")
    }

    setUsername = (username) => {
        this.setState({
            username: username.target.value
        })
    }

    onPickUsername = async () => {
        const {user, username, verified, token} = this.state;

        if (!verified) {
            this.props.stopLoading();
            toastError("Hey! Your reCaptcha expired, please reload this page before signing up. We are sorry for the inconvenience caused.");
            return;
        }

        if (!username.trim()) {
            toastError("Hey make sure your name has only Alphanumeric characters and contains 6 to 40 characters.");
            return;
        }

        reCaptchaCheck(token)
            .then(() => updateUserObject(user.uid, {username}))
            .then((resp) => {
                if (resp.statusCode === 200) {
                    return window.location.href = "/play";
                }
                toastError(resp.payload.status);
            })
            .catch((err) => {
                console.log(err);
                toastError(err.error ? err.error : 'Sorry that username is already taken, try something else!');
            });
    }

    render() {
        const { username } = this.state;

        return (
            <div className="loginTextColor">
                <ToastContainer
                    draggable
                    position="bottom-right"
                />
                <span className="textMedium">Few More Steps...</span>
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
                        onChange={(username) => this.setUsername(username)}
                        required
                        type='text'
                        autoFocus
                    />
                    <Recaptcha
                        ref={e => recaptchaInstance = e}
                        sitekey={process.env.REACT_APP_SITEKEY}
                        render="explicit"
                        size="invisible"
                        verifyCallback={this.verifyCallback}
                        expiredCallback={this.expiredCallback}
                        onloadCallback={(res)=>{
                            console.log("Loaded captcha")
                        }} 
                    />
                    <div className="button loginBtn" onClick={() => this.onPickUsername()}>Pick Username</div>
                </div>
            </div>
        );
    }
}

export default ChangeName;
