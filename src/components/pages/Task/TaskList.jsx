import React, { useContext, useState, useEffect } from "react";
import { useTaskContext } from "../../TaskContext";
import CircleProgressBar from '../../CircleProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../ThemeContext';
import Button from '../../Common/Button';
import TaskModal from './TaskModal';
import TaskItem from './../../TaskItem';
import DetailModal from './DetailModal';

const TaskList = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState('')
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { tasks, fetchTasks, addTask, updateTask, deleteTask, counts, loading, updateStatus } = useTaskContext();


  useEffect(() => {
    if (user) {
      fetchTasks(user.token);
    }
  }, []);


  const handleEdit = (task) => {
    setIsModalOpen(true)
    setCurrentTask(task)
  }
  const handleClose = () =>{
    setIsModalOpen(false)
    setCurrentTask({title:'',notes:'', status:''})
  }
  const handleDetail = (task) =>{
    setIsDetailOpen(true);
    setCurrentTask(task);
  }
 

  return (

    <div id={theme}>
      <h1>Welcome back, <span className="username">{user.profile.name}</span> </h1>

      {
        loading ?
          <div className="overlay">
            <div className="spinner"></div>
          </div>
          :
          <div className="taskContainer">
            <div className="taskList">
              <div className="taskCardHeader">
                <h2><FontAwesomeIcon icon={faCalendar} /> &nbsp; To Do</h2>
                <Button type="create_new" label="Add New Task" onAction={() => setIsModalOpen(true)} />
              </div>

              <div className="taskCardBody">
                {
                  tasks?.map((task) => (
                    <TaskItem key={task.id} task={task} handleEdit={handleEdit} deleteTask={deleteTask} handleDetail={handleDetail} updateStatus={updateStatus}  />
                  ))
                }
              </div>
            </div>
            {counts.total > 0 &&

              <div className="taskProgressList">
                <h2>Total Tasks : {counts.total}</h2>
                <div className="taskProgressBody">
                <div className="progressItem">
                  <CircleProgressBar size={100} strokeWidth={12} percentage={counts.completePercentage} color="#4caf50" label="Complete" />
                  <p>Complete : {counts.complete} </p>
                </div>
                <div>
                  <CircleProgressBar size={100} strokeWidth={12} percentage={counts.incompletePercentage} color="#ff0000" label="Complete" />
                  <p>Not Started : {counts.incomplete} </p>
                </div>
                </div>
              </div>
            }
          </div>

      }

      {
        isModalOpen && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={handleClose}
            task={currentTask}
            addTask={addTask}
            updateTask={updateTask}
            setIsModalOpen={setIsModalOpen}
          />
        )
      }

      {
        isDetailOpen && (
          <DetailModal
            isOpen={isDetailOpen}
            onClose={()=>setIsDetailOpen(false)}
            task={currentTask}
          />
        )
      }
    </div>
  );
};

export default TaskList;
