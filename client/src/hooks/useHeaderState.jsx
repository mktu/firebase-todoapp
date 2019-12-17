import { useState, useContext } from 'react';
import { auth } from '../services';
import { AuthContext } from '../contexts';
import { useErrorState } from '.';

export default function () {
    const [showLogin, setShowLogin] = useState(false);
    const { userState, actions } = useContext(AuthContext);
    const { user } = userState;
    const { setError, hasError, error, refresh } = useErrorState();

    const signinModalState = {
        handleGoogoleLogin: () => {
            if (!user.isAnonymous) {
                auth.loginByGoogle(setError);
            }
            else {
                auth.linkWithGoogle((user) => {
                    setShowLogin(false);
                    actions.login(user);
                }, setError)
            }
        },
        handleLogout: () => {
            auth.logout(() => {
                setShowLogin(false);
            }, setError);
        },
        isOpen: showLogin && !hasError,
        hide: () => { setShowLogin(false); },
        show: () => { setShowLogin(true); },
    };

    const errorModalState = {
        hasError,
        message: hasError && error.message,
        handleClose: () => { refresh() }
    }

    return { signinModalState, errorModalState, user };
}