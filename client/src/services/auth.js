import firebase from './firebase';

export const listenAuthState = (dispatch) => {
    return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            dispatch({
                type: 'login',
                payload: {
                    user
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

export const loginByGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function (error) {
        console.error(error);
    });
}

export const logout = () => {
    firebase.auth().signOut().catch(function (error) {
        console.error(error);
    });
}