import firebase from '../configs/firebase';

export const uodateUsername = (username) => {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: username
        })
        .then(() => {
            resolve();
        })
        .catch(() => {
            reject()
        })
    })
}
