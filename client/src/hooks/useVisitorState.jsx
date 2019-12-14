import { useState } from 'react';
import { auth } from '../services';
import { useErrorState } from '.';

export default function(){
    const [showLogin, setShowLogin] = useState(false);
    const errorState = useErrorState();
    return [{
        value : showLogin,
        set : value => () =>{setShowLogin(value)}
    },
    errorState,
    {
        login : ()=>{
            auth.loginByGoogle(errorState.setError);
        },
        anonymous:()=>{
            auth.loginWithAnonymous(errorState.setError);
        }
    }];
}