import React, { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useGoogleApi from './components/GoogleApi';
import MainLayout from './Layout/MainLayout';
import Login from './components/pages/Auth/Login';
import TaskList from './components/pages/Task/TaskList';
import ErrorPage from './components/Common/ErrorPage';

function App() {
  useGoogleApi();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div>
        {!user ? (
          <Login onSignIn={setUser} />
        ) : (
          <MainLayout>
            <Routes>
              <Route path="/" element={<TaskList user={user} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </MainLayout>
        )}
      </div>
    </Router>
  );
}

export default App;
