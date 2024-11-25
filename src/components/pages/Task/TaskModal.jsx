import react, { useState } from 'react';
import Button from '../../Common/Button';

const TaskModal = ({ isOpen, onClose, task, addTask, updateTask, setIsModalOpen }) => {
  const [newTask, setNewTask] = useState({
    title: task?.title || '',
    notes: task?.notes || '',
    status: task?.status || '',
  })
  const [title, setTitle] = useState(task?.title || "");
  const [notes, setNotes] = useState(task?.notes || "");
  const [status, setStatus] = useState(task?.status || "needsAction");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Submitted:", newTask);
    if(task){
      updateTask(task.id, newTask)
    }else{

      addTask(newTask); 
    }
    setIsModalOpen(false)
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <div className="modal-body">
          <input type="text" placeholder="Task Title" value={newTask.title} name="title" onChange={handleInputChange} />
          <textarea type="text" name="notes" placeholder="Task Description" value={newTask.notes} onChange={handleInputChange }>{notes}</textarea>
          <select name="status" id="status" value={newTask.status} onChange={handleInputChange} >
            <option value="needsAction">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          {/**
            <input type="datetime-local" placeholder="Due Date" value={due} name="due" onChange={(e) => setDue(e.target.value)} />
            */}
        </div>
        <div className="modal-footer">
          <button type="submit" className="actionButton add">{task ? "Update" : "Create"}</button>
          <Button className="close" type="close" label="Close" onAction={onClose} />
        </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
