import firebase from './firebase';
import {defaultErrorHandller} from '../utils';

export const listenAuthState = (dispatch) => {
    return firebase.auth().onAuthStateChanged(function (user) {
        console.log(user)
        if (user) {
            // User is signed in.
            dispatch({
                type: 'login',
                payload: {
                    user: { ...user }
                }
            });
        } else {
            // User is signed out.
            // ...
            dispatch({
                type: 'logout',
            });
        }
    });
}

export const loginByGoogle = (
    onFailed = defaultErrorHandller
) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(onFailed);
}

export const linkWithGoogle = (
    onSucceeded = defaultErrorHandller,
    onFailed = defaultErrorHandller
) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const curUser = firebase.auth().currentUser;
    curUser.linkWithPopup(provider).then(function (usercred) {
        const user = usercred.user;
        user.updateProfile({
            displayName: usercred.additionalUserInfo.profile.name
        }).then(function () {
            onSucceeded(user);
        }).catch(onFailed)
    }).catch(onFailed);
}

export const loginWithAnonymous = (
    onFailed = defaultErrorHandller
) => {
    firebase.auth().signInAnonymously().catch(onFailed);
}

export const logout = (
    onFailed = defaultErrorHandller
) => {
    firebase.auth().signOut().catch(onFailed);
}