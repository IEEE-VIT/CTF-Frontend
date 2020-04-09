import firebase from '../configs/firebase';

export const googleOAuth = () => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                resolve(user);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
          
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
