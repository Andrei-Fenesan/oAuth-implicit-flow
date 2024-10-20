import React from 'react';
import './login.css'
import { oauthStateLocalStorageKey } from './constants/constants';

const Login = () => {
  
  const redirectToGoogleAuth = () => {
    const state = generateCryptoRandomState()
    localStorage.setItem(oauthStateLocalStorageKey, state)
    window.location.href = `${process.env.REACT_APP_GOOGLE_ACCOUNTS}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT_URI}&state=${state}&scope=${process.env.REACT_APP_OAUTH_SCOPE}&response_type=${process.env.REACT_APP_OAUTH_RESPONSE_TYPE}`
  }

  const generateCryptoRandomState = () => {
    const randomValues = new Uint32Array(2);
    window.crypto.getRandomValues(randomValues);

    const utf8Encoder = new TextEncoder();
    const utf8Array = utf8Encoder.encode(
      String.fromCharCode.apply(null, randomValues)
    );

    return btoa(String.fromCharCode.apply(null, utf8Array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  return (
    <div className='center'>
      <div>
        <h1>Hello to the Oauth Implict Flow</h1>
        <button className='signInBtn' onClick={() => redirectToGoogleAuth()}>Sign in with google</button>   
      </div>
    </div>
  );
}

export default Login;
