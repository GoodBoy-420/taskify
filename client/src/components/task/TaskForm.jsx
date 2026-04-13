import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const TaskForm = ({ addTask }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { api } = useAxios();
  const { auth } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      if (!auth?.authToken) {
        navigate("/");
        return;
      }

      const res = await api.post(
        `${import.meta.env.VITE_BASE_URL}/task/create`,
        { ...formObject },
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Task creation failed");
      }

      const newTask = res.data.data;
      addTask(newTask);

      e.target.reset();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 md:w-96 mb-8">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">
        Create Task
      </h2>

      {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

      <form onSubmit={submitForm} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          required
          className="w-full border border-purple-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-purple-300"
        />

        <textarea
          name="description"
          placeholder="Task description (optional)"
          className="w-full border border-purple-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
