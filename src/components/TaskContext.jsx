import React, { createContext, useContext, useState } from "react";
import { gapi } from 'gapi-script';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    complete: 0,
    incomplete: 0,
    completePercentage: 0,
    incompletePercentage: 0,
    total: 0,
  })


  const fetchTasks = async (token) => {
    try {
      setLoading(true);
      await gapi?.client?.load("tasks", "v1");

      const response = await gapi.client?.tasks?.tasks?.list({
        tasklist: "@default",
        auth: token,
      });

      const fetchedTasks = response?.result?.items || [];
      setTasks(fetchedTasks); 

      countUpdate(fetchedTasks);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const addTask = async (data) => {
    try {
      setLoading(true);
      const response = await gapi.client.tasks.tasks.insert({
        tasklist: '@default',
        resource: {
          title: data.title,
          notes: data.notes,
          status: data.status,
        },
      });

      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, response.result];
        countUpdate(updatedTasks);
        return updatedTasks;
      }
      );

      setLoading(false);

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      if (!taskId) {
        throw new Error("Task ID is missing or invalid.");
      }

      await gapi?.client?.load("tasks", "v1");

      setLoading(true);

      const response = await gapi?.client?.tasks?.tasks?.update({
        tasklist: "@default",
        task: taskId,
        id:taskId,
        title: updatedData.title, 
        notes: updatedData.notes, 
        status: updatedData.status, 
        resource: {
          title: updatedData.title, 
          notes: updatedData.notes, 
          status: updatedData.status, 
        },
      });


      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId
            ? {
              ...task,
              title: updatedData.title,
              notes: updatedData.notes,
              status: updatedData.status,
            }
            : task
        )
        countUpdate(updatedTasks);
        return updatedTasks;
      }
      );

      setLoading(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);

    await gapi.client.tasks.tasks.delete({
      tasklist: '@default',
      task: taskId,
    });
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      countUpdate(updatedTasks);
      return updatedTasks;
    }
    );

    setLoading(false);
  };

  const updateStatus = async (taskId, updatedData) => {
    try {
      
      await gapi?.client?.tasks?.tasks?.update({
        tasklist: "@default",
        task: taskId,
        id: taskId,
        title: updatedData.title,
        notes: updatedData.notes,
        status: updatedData.status,

        resource: {
          title: updatedData.title,
          notes: updatedData.notes,
          status: updatedData.status,
        },
      });
      setTasks((prevTasks) => {
        const updatedTask = prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: updatedData.status, title:updatedData.title, notes:updatedData.notes } : task
        )
        countUpdate(updatedTask)
        return updatedTask;
      }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const countUpdate = (tasks) => {
    const totalTasks = tasks.length;
    const completeCount = tasks.filter((task) => task.status === "completed").length;
    const incompleteCount = tasks.filter((task) => task.status === "needsAction").length;

    const completePercentage = totalTasks > 0 ? (completeCount / totalTasks) * 100 : 0;
    const incompletePercentage = totalTasks > 0 ? (incompleteCount / totalTasks) * 100 : 0;

    setCounts({
      total: totalTasks,
      complete: completeCount,
      incomplete: incompleteCount,
      completePercentage: completePercentage.toFixed(2),
      incompletePercentage: incompletePercentage.toFixed(2),
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        counts,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        updateStatus
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
