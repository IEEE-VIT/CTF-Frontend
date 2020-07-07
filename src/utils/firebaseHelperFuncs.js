import firebase from '../configs/firebase';

export const googleOAuth = () => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider); 
        resolve();            
    })
}

export const updateName = (name) => {
    return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
        .then(() => {
            resolve();
        })
        .catch(() => {
            reject()
        })
    })
}
