import { useState, useEffect } from 'react';
import { auth } from '../services';
import { useErrorState } from '.';

export default function(user,onLinkSucceeded){
    const [showLogin, setShowLogin] = useState(false);
    const errorState = useErrorState();
    useEffect(()=>{
        setShowLogin(false);
    },[user]);
    return [{
        value : showLogin,
        onClick : value => () =>{setShowLogin(value)}
    },
    errorState,
    {
        login : ()=>{
            auth.loginByGoogle(errorState.setError);
        },
        logout : ()=>{
            auth.logout(errorState.setError);
        },
        link:()=>{
            auth.linkWithGoogle(onLinkSucceeded,errorState.setError);
        }
    }];
}