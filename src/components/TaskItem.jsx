import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task, handleEdit, deleteTask, handleDetail, updateStatus }) => {
  const LimitedText = ({ text, limit }) => {
    return (
      <small className="notes">
        {text?.length > limit ? `${text.substring(0, limit)}...` : text}
      </small>
    );
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    return formattedDate;
  };
  const handleChange = (e) =>{
    const updatedData = {
    title:task.title, notes:task.notes, status: e.target.value
    }
    updateStatus(task.id, updatedData)
}
  return (
    <div className="taskCardItem">
      <div className="cardTitle">
        <h3>
          <a href={task.webViewLink} target="_blank" rel="noopener noreferrer">
            {task.title === "(no subject)" ? "Untitled Task" : task.title}
          </a>
        </h3>
        <div className="actions">
          <div onClick={() => handleDetail(task)}>
            <FontAwesomeIcon icon={faEye} color="#ffffff" />
          </div>

          <div onClick={() => handleEdit(task)}>
            <FontAwesomeIcon icon={faEdit} color="#0000ff" />
          </div>
          <div onClick={() => deleteTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} color="#ff0000" />
          </div>
        </div>
      </div>
        <LimitedText text={task.notes} limit={100} />
      <div className="dueDate">
        Due Date: {task.due ? formatDate(task.due) : "No Due Date"}
</div>
      <div className="status">
        <p>Updated: &nbsp; {new Date(task.updated).toLocaleString()} </p>
        <p>
          Status: &nbsp;&nbsp;
          <select
          value={task.status}
          onChange={handleChange}
          className="statusDropdown"
          >
          <option value="needsAction">Not Started</option>
          <option value="completed">Completed</option>
          </select>
        </p>

      </div>

    </div>
  )
}

export default TaskItem
