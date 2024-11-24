import react, { useState } from 'react';
import Button from '../../Common/Button';

const TaskModal = ({ isOpen, onClose, task, onSubmit }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [notes, setNotes] = useState(task?.notes || "");
  const [status, setStatus] = useState(task?.status || "needsAction");
  const [due, setDue] = useState(task?.due || "");

  const handleSubmit = () => {
      onSubmit({ title, notes, status,due })
  }

  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <div className="modal-body">
          <input type="text" placeholder="Task Title" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
          <textarea type="text" name="notes" placeholder="Task Description" value={notes} onChange={(e) => setNotes(e.target.value)} >{notes}</textarea>
          <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)} >
            <option value="needsAction">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          {/**
            <input type="datetime-local" placeholder="Due Date" value={due} name="due" onChange={(e) => setDue(e.target.value)} />
            */}
        </div>
        <div className="modal-footer">
          <Button type="add" className="add"  label={task ? "Update" : "Create"} onAction={handleSubmit} />
          <Button className="close" type="close" label="Close" onAction={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
