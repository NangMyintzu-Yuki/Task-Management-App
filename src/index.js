import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId="99854061506-p3tsepphg39c5he8fima5kg7fqn5nafa.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
