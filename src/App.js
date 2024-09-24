import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    setTasks([...tasks, { description: taskInput, completed: false }]);
    setTaskInput("");
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        {/* Task Input */}
        <div className="flex mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task"
          />
          <button
            onClick={handleAddTask}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task Filter */}
        <div className="flex justify-between mb-4">
          <button
            className={`p-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`p-2 rounded-lg ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`p-2 rounded-lg ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-b">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.description}
                </span>
              </div>
              <button
                onClick={() => handleRemoveTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Error handling for empty tasks */}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks to display.</p>
        )}
      </div>
    </div>
  );
};

export default App;
