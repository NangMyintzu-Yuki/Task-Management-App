import React, { useState, useContext } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import ThemeToggleButton from '../../Common/ThemeToggleButton';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css'
import { ThemeContext } from '../../../ThemeContext';

const Register = ({ onRegisterSuccess }) => {
  const [user, setUser] = useState(null);
  const {theme}  = useContext(ThemeContext)
  const navigate = useNavigate();

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userData = await userInfo.json();
        onRegisterSuccess(userData);

        setUser(userData);
        navigate('/login');
        localStorage.setItem('googleUser', JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.error('Register Failed');
    },
  });

  return (

    <div className="container" id={theme}>
      <div className="header">
        <img src="/images/nmz.png" alt="" />
        <ThemeToggleButton />
      </div>
      <div className="card">
      <div className="intro">

        <h1>Welcome To Task App</h1>
          <small> “One of the secrets of getting more done is to make a TO-DO List every day, keep it visible, and use it as a guide to action as you go through the day.”</small>
        </div>
        <div className="googleLogin">
          <button
            onClick={registerWithGoogle}
            className="googleBtn"
          >
            <img
              src="/images/google.webp"
              alt="Google logo"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            Sign Up with Google
          </button>

        </div>
        <p>
          I have already an account? <a href="/login" >Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
