

// ReactDOM.render(
  //   <GoogleOAuthProvider clientId="99854061506-p3tsepphg39c5he8fima5kg7fqn5nafa.apps.googleusercontent.com">
  //     <App />
  //   </GoogleOAuthProvider>,
  //   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId="99854061506-p3tsepphg39c5he8fima5kg7fqn5nafa.apps.googleusercontent.com">

      <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
