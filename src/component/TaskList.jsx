import { useContext } from "react";
import { TaskContext } from "../App";
import Cookies from "js-cookie";

const TaskList = () => {
  const { taskState, filter, setFilter, sort, setSort } = useContext(TaskContext);

  const filteredTasks = taskState.tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "completed") return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    return 0;
  });

  return (
    <div className="container p-4">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-primary">Task Manager</h2>
        <div className="d-flex">
          <select
            className="form-select me-2 shadow-sm border-primary"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              Cookies.set("filter", e.target.value, { expires: 7 });
            }}
           >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="form-select shadow-sm border-primary"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              Cookies.set("sort", e.target.value, { expires: 7 });
            }}
          >
            <option value="none">No Sort</option>
            <option value="completed">Sort by Completion</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped shadow-sm rounded overflow-hidden">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id}>
                <td className="fw-bold">{task.id}</td>
                <td>{task.title}</td>
                <td className={task.completed ? "text-success fw-bold" : "text-warning fw-bold"}>
                  {task.completed ? "✔ Completed" : "⌛ Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
