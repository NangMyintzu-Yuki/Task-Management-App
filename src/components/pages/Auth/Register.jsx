import React, { useState, useContext } from 'react';
import ThemeToggleButton from '../../Common/ThemeToggleButton';
import '../../css/auth.css'
import { ThemeContext } from '../../../ThemeContext';
import { gapi } from 'gapi-script';

const Register = ({ onSignIn }) => {
  const {theme}  = useContext(ThemeContext)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const registerWithGoogle = async() =>{
    try {
      const googleAuth = gapi.auth2.getAuthInstance();
      const user = await googleAuth.signIn();

      const userInfo = {
        profile: {
          id: user.getId(),
          name: user.getBasicProfile().getName(),
          email: user.getBasicProfile().getEmail(),
          imageUrl: user.getBasicProfile().getImageUrl(),
        },
        token: user.getAuthResponse().id_token,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      setIsSignedIn(true);
      onSignIn(userInfo);
      window.location.href="/";
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  }
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
          I have already an account? <a href="/" >Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
