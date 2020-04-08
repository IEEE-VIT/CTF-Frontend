import validator from 'validator';
import * as firebase from 'firebase';

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
}

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
}
