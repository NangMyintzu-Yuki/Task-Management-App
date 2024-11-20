import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import { fetchTaskLists, fetchTasks } from './services/api';

import './App.css'

function App() {
  const [userToken, setUserToken] = useState(null);
  const [taskLists, setTaskLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState(null);

  const handleLoginSuccess = (token) => {
    setUserToken(token);
  };

  useEffect(() => {
    if (userToken) {
      fetchTaskLists(userToken)
        .then((response) => setTaskLists(response.data.items))
        .catch((error) => console.error('Error fetching task lists:', error));
    }
  }, [userToken]);

  const handleSelectTaskList = (listId) => {
    setSelectedTaskList(listId);
    fetchTasks(listId, userToken)
      .then((response) => setTasks(response.data.items))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  return (
    <div>
      {!userToken ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
          <div>
            <h1>Task Lists</h1>
            <ul>
              {taskLists.map((list) => (
                <li key={list.id} onClick={() => handleSelectTaskList(list.id)}>
                  {list.title}
                </li>
              ))}
            </ul>
            {selectedTaskList && (
              <div>
                <h2>Tasks</h2>
                <ul>
                  {tasks.map((task) => (
                    <li key={task.id}>
                      {task.title} - {task.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      )}
    </div>
  );
}

export default App;
