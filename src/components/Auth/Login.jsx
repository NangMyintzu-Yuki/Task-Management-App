import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import ThemeToggleButton from '../Common/ThemeToggleButton'
const Login = ({ onLoginSuccess }) => {
  return (
    <div className="container">
    <div className="header">
    <img src="/assets/nmz.png" alt="" />
        <ThemeToggleButton/>
    </div>
      <div className="card">
        <h1>Welcome Back</h1>
        <GoogleLogin
          onSuccess={(response) => onLoginSuccess(response.credential)}
          onError={() => console.error('Login Failed')}
        />
      </div>
    </div>
  );
};

export default Login;
