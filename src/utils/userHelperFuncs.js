import validator from 'validator';
import * as firebase from 'firebase';

// import api
import activityLayerApi from '../apis/activityLayerApi.js';

export const checkUserEmailAndPassword = (email, password) => {

    if (!validator.isEmail(email)) {
        console.log("Not an Email!!!");
        return false;
    }

    if (!validator.isAlphanumeric(password) || password.length < 6 || password.length > 40) {
        console.log("Passwords can have only Alphanumeric characters");
        return false;
    }

    return true;
};

export const checkUsername = (username) => {
    if (!validator.isAlphanumeric(username)) {
        console.log("Username invalid");
        return false;
    }

    if (username.length < 6 || username.length > 40) {
        console.log("Username too short or long");
        return false;
    }

    return true;
};

export const pingServer = () => {
    return new Promise((resolve, reject) => {
        activityLayerApi.get("getAllQuestions", {
            headers: {
                'Authorization': 'Bearer ',
            }
        })
            .then((resp) => {
                console.log(resp);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                resolve();
            })
    })
}

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        activityLayerApi.get("/profile", {
            headers: {
                'Authorization': 'Bearer ' + firebase.auth().currentUser.uid,
            }
        })
            .then((resp) => {
                console.log(resp);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                resolve();
            })
    })
}
