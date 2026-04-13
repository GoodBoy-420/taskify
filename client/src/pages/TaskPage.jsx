import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";

const TaskPage = () => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      if (!auth?.authToken) {
        navigate("/");
        return;
      }

      const res = await api.get(
        `${import.meta.env.VITE_BASE_URL}/task/get-tasks`,
      );

      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-purple-600 mb-6">
        Task Manager
      </h1>

      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} loading={loading} />
    </div>
  );
};

export default TaskPage;
