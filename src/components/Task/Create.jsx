import { useState } from 'react';
import { addTask } from './services/api';

const CreateTask = ({ listId, accessToken, onTaskAdded }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    const taskData = { title: taskTitle };
    addTask(listId, taskData, accessToken)
      .then(() => {
        setTaskTitle('');
        onTaskAdded();
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New Task Title"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default CreateTask;
