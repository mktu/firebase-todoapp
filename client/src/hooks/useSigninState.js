import { useContext } from 'react';
import { auth } from '../services';
import { AuthContext } from '../contexts';

export default function ({ handleError }) {
    const { userState, actions } = useContext(AuthContext);
    const { user } = userState;

    const handleGoogoleLogin = () => {
        if (!user || !user.isAnonymous) {
            auth.loginByGoogle(handleError);
        }
        else {
            auth.linkWithGoogle((user) => {
                actions.login(user);
            }, handleError)
        }
    };

    const handleAnonymousLogin = ()=>{
        auth.loginWithAnonymous(handleError);
    };

    const handleLogout = () => {
        auth.logout(() => {
        }, handleError);
    };

    return { handleGoogoleLogin, handleAnonymousLogin, handleLogout, user };
}