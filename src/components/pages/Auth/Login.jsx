import React from 'react';
import ThemeToggleButton from './../../Common/ThemeToggleButton';
import '../../css/auth.css'
import { useContext, useState } from 'react';
import { ThemeContext } from './../../../ThemeContext';
import { gapi } from "gapi-script";
const Login = ({ onSignIn }) => {
  const {theme} = useContext(ThemeContext)
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async () => {
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
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (

    <div className="container" id={theme}>
      <div className="header">
        <img src="/images/nmz.png" alt="" />
        <ThemeToggleButton />
      </div>
      <div className="card">
        <div className="intro">
          <h1>Welcome To Task App</h1>
          <small>We need to do a better job of putting ourselves higher on our own 'to do' list</small>
        </div>
        <div className="googleLogin">
          <button
            onClick={handleSignIn}
            className="googleBtn"
          >
            <img
              src="/images/google.webp"
              alt="Google logo"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            Sign In with Google
          </button>

        </div>
        <p>
          Don't have an account? <a href="/register" className="signUp">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
