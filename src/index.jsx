import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TaskProvider } from './components/TaskContext';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
    <ThemeProvider>
      <GoogleOAuthProvider clientId="99854061506-p3tsepphg39c5he8fima5kg7fqn5nafa.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
