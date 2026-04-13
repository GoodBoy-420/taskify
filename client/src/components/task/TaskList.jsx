const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return <p className="text-gray-500">Loading tasks...</p>;
  }

  return (
    <div className="w-80 md:w-96 space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow rounded-xl p-4 border border-purple-100"
          >
            <h3 className="font-semibold text-purple-600">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
