import firebase from './firebase';
import {consoleError,consoleLogger} from '../utils';

export const listenAuthState = (dispatch) => {
    return firebase.auth().onAuthStateChanged(function (user) {
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
    onFailed = consoleError
) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(onFailed);
}

export const linkWithGoogle = (
    onSucceeded,
    onFailed = consoleError
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
    onSucceeded = consoleLogger,
    onFailed = consoleError
) => {
    firebase.auth().signInAnonymously().then(onSucceeded).catch(onFailed);
}

export const logout = (
    onSucceeded = consoleLogger,
    onFailed = consoleError
) => {
    firebase.auth().signOut().then(onSucceeded).catch(onFailed);
}