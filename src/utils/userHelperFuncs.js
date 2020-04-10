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

export const checkName = (name) => {
    if (!validator.isAlphanumeric(validator.blacklist(name, ' '))) {
        console.log("Username invalid");
        return false;
    }

    if (name.length < 6 || name.length > 40) {
        console.log("Username too short or long");
        return false;
    }

    return true;
};

export const pingServer = () => {
    return new Promise((resolve, reject) => {
        activityLayerApi.get("/")
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

export const getUserProfile = (uid) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/profile", {
        }, {
            headers:{
                Authorization: "Bearer "+uid,
            }
        })
            .then((resp) => {
                console.log(resp);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    });
}

export const createUser = (email, name, uid) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/user/create", {
            email,
            name,
            uid,
        }, {
            headers:{
                Authorization: "Bearer " + uid,
            }
        })
            .then((resp) => {
                console.log(resp);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
}

export const updateUserObject = (uid, { username, name }) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/user/create", {
            username,
            name,
        }, {
            headers:{
                Authorization: "Bearer " + uid,
            }
        })
            .then((resp) => {
                console.log(resp);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
}
