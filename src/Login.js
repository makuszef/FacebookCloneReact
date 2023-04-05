import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase';
import './Login.css'
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png" alt=""/>
                
                
            </div>
            <Button type="submit" onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
