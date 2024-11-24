import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useGoogleApi from './components/GoogleApi';
import MainLayout from './Layout/MainLayout';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
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
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Login onSignIn={setUser} />} />
              <Route path="/register" element={<Register onSignIn={setUser} />} />
              <Route path="*" element={<ErrorPage to="/" />} />
            </>
          )}

          {user && (
            <Route
              path="/"
              element={
                <MainLayout>
                  <TaskList user={user} />
                </MainLayout>
              }
            />
          )}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
