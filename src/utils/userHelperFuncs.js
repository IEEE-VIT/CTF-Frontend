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

export const reCaptchaCheck = (token) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/user/auth/recaptcha", {
            token,
        }, {

        })
            .then((resp) => {
                console.log(resp.data.auth);
                if (resp.data.auth !== 1) {
                    throw new Error("Auth was not equal to 1");
                }
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject("Oops! Looks like your reCaptcha is failing, try refreshing this page or switch to a better network connection.");
            })
    })
}


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
        activityLayerApi.post("/user/profile", {

        }, 
        {
            headers: {
                Authorization: "Bearer "+uid,
            } 
        })
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.statusCode === 200) {
                    resolve(resp.data.payload.userProfile);
                    return;
                } 
                throw new Error("Server did not respond with status 200");
            })
            .catch((err) => {
                console.log(err);
                reject();
            })
    })
}

export const createUser = (email, name, uid) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/user/create", {
            email,
            name,
        }, {
            headers: {
                Authorization: "Bearer "+uid,
            },
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
}

export const updateUserObject = (uid, { username }) => {
    return new Promise((resolve, reject) => {
        activityLayerApi.post("/user/updateProfile", {
            userName: username,
        }, {
            headers:{
                Authorization: "Bearer " + uid,
            }
        })
            .then((resp) => {
                console.log(resp.data);
                resolve(resp.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
}

export const getLeaderBoard = () => {
    return new Promise((resolve, reject) => {
        try {
            activityLayerApi.post('/user/leaderboard', {}, {
                headers: {
                    Authorization: 'Bearer ' + firebase.auth().currentUser.uid,
                }
            })
                .then((resp) => {
                    if (resp.data.statusCode === 200) {
                        resolve(resp.data.payload.data);
                        return;
                    }
                    throw new Error("Server did not respond with status 200")
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                })
        } catch (err) {

        }
    })
}

export const getQuestions = () => {
    return new Promise((resolve, reject) => {
        try {
            activityLayerApi.post('/user/getAllQuestions', {}, {
                headers: {
                    Authorization: 'Bearer ' + firebase.auth().currentUser.uid,
                }
            })
                .then((resp) => {
                    if (resp.data.statusCode === 200) {
                        resolve(resp.data.payload.body);
                        return;
                    }
                    throw new Error("Server did not respond with status 200")
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                })
        } catch (err) {
            console.log(err);
            reject();
        }
    })
}

export const getHint = (questionID) => {
    return new Promise((resolve, reject) => {
        try {
            activityLayerApi.post('/user/hint', {
                questionID,
            }, {
                headers: {
                    Authorization: 'Bearer ' + firebase.auth().currentUser.uid,
                }
            })
                .then((resp) => {
                    if (resp.data.statusCode === 200) {
                        resolve(resp.data.payload.hint);
                        return;
                    }
                    throw new Error("Server did not respond with status 200")
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        } catch (err) {
            console.log(err);
            reject();
        }
    });
};

export const answerQuestion = (questionId, answer) => {
    return new Promise((resolve, reject) => {
        try {
            activityLayerApi.post('/user/checkFlag', {
                id: questionId,
                flag: answer,
            }, {
                headers: {
                    Authorization: 'Bearer ' + firebase.auth().currentUser.uid,
                }
            })
                .then((resp) => {
                    console.log(resp.data);
                    if (resp.data.statusCode === 200) {
                        resolve(resp.data.payload.msg === "Answer correct");
                        return;
                    }
                    throw new Error("Server did not respond with status 200")
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        } catch (err) {
            console.log(err);
            reject();
        }
    });
}
