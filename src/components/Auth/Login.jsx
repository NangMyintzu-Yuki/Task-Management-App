import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onLoginSuccess }) => {
  return (
    <div className="container">
      <h1>Welcome Back</h1>
      <GoogleLogin
        onSuccess={(response) => onLoginSuccess(response.credential)}
        onError={() => console.error('Login Failed')}
      />
    </div>
  );
};

export default Login;
