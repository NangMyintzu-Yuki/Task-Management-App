import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task, handleEdit, deleteTask, handleDetail, handleStatusChange }) => {
  const LimitedText = ({ text, limit }) => {
    return (
      <small className="notes">
        {text?.length > limit ? `${text.substring(0, limit)}...` : text}
      </small>
    );
  };
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
      <div className="status">
        <p>Updated: &nbsp; {new Date(task.updated).toLocaleString()} </p>
        <p>
          Status: &nbsp;&nbsp;
          <select
          value={task.status}
          onChange={(e)=>handleStatusChange(task.id,e.target.value)}
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
