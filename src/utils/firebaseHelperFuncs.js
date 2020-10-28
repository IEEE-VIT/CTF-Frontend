import firebase, {firebaseAuth} from '../configs/firebase';

export const googleOAuth = () => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebaseAuth.signInWithRedirect(provider); 
        resolve();
    })
}

export const updateName = (name) => {
    return new Promise((resolve, reject) => {
        const user = firebaseAuth.currentUser;
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
