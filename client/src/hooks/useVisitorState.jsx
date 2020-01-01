import { useState, useEffect } from 'react';
import { useErrorState } from '.';
import { useSigninState } from '.';

export default function () {
    const [showLogin, setShowLogin] = useState(false);
    const { setError, hasError, error, refresh } = useErrorState();
    const { handleGoogoleLogin,handleAnonymousLogin,handleLogout,user } = useSigninState({handleError:setError})

    useEffect(()=>{
        setShowLogin(false);
    },[user])
    
    const signinModalState = {
        handleGoogoleLogin,
        handleAnonymousLogin,
        handleLogout,
        isOpen: showLogin && !hasError,
        hide: () => { setShowLogin(false); },
        show: () => { setShowLogin(true); },
    };

    const errorModalState = {
        hasError,
        message: hasError && error.message,
        handleClose: () => { refresh() }
    };
    
    return {signinModalState,  errorModalState};
}