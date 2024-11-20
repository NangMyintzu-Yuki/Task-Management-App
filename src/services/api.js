import axios from 'axios';

const API_BASE = 'https://tasks.googleapis.com/tasks/v1';

export const fetchTaskLists = (accessToken) => {
  return axios.get(`${API_BASE}/users/@me/lists`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const fetchTasks = (listId, accessToken) => {
  return axios.get(`${API_BASE}/lists/${listId}/tasks`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
