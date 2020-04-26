import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing firebase
import firebase from '../../configs/firebase';

// import utils
import { updateUserObject } from '../../utils/userHelperFuncs';

// importing components
import { toastError, toastSuccess } from '../toasts/toasts.js';

// Importing styles
import '../../Styles.css';
import './ChangeName.css';

class ChangeName extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            user: props.user,
        }
    }

    componentDidMount() {
        toastSuccess("Just a few more steps, Setup a username to start your journey!");
    }

    setUsername = (username) => {
        this.setState({
            username: username.target.value
        })
    }

    onPickUsername = async () => {
        const {user, username} = this.state;

        if (!username.trim()) {
            toastError("Hey make sure your name has only Alphanumeric characters and contains 6 to 40 characters.");
            return;
        }

        updateUserObject(user.uid, {username})
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
                    <div className="button loginBtn" onClick={() => this.onPickUsername()}>Pick Username</div>
                </div>
            </div>
        );
    }
}

export default ChangeName;
