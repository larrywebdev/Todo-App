import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

function List({ filteredTodos, toggleCompleted, deleteTodo, saveEditedTodo }) {
  const [showFullId, setShowFullId] = useState(null);
  const [limit, setLimit] = useState(getLimit());
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function getLimit() {
    const width = window.innerWidth;
    if (width < 375) return 25;
    if (width < 480) return 33;
    if (width < 768) return 45;
    return 70;
  }

  const editTodo = (todoItem) => {
    setEditId(todoItem.id);
    setEditTask(todoItem.todoText);
    setEditDescription(todoItem.todoDescription);
  };

  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimit());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ul style={{ display: "grid", gap: "20px" }}>
      {filteredTodos.map((todoItem) => {
        const isFull = showFullId === todoItem.id;
        const shouldTruncate = todoItem.todoDescription.length > limit;
        const displayText = isFull
          ? todoItem.todoDescription
          : todoItem.todoDescription.slice(0, limit) +
            (shouldTruncate ? "..." : "");

        return (
          <li className="task-card" key={todoItem.id}>
            {editId === todoItem.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveEditedTodo(editId, editTask, editDescription);
                  setEditId(null);
                }}
                className="edit-form grid grid-cols-2 gap-3"
              >
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  placeholder="Task"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div id="task-card-left">
                  <div className="checkbox-wrapper">
                    <div className="round">
                      <input
                        type="checkbox"
                        id={`checkbox-${todoItem.id}`}
                        checked={todoItem.completed}
                        onChange={() => toggleCompleted(todoItem.id)}
                      />
                      <label htmlFor={`checkbox-${todoItem.id}`}></label>
                    </div>
                  </div>

                  <div className="task-grid">
                    <span
                      className="task"
                      style={{
                        textDecoration: todoItem.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todoItem.todoText}
                    </span>
                    <span
                      className="description"
                      style={{
                        textDecoration: todoItem.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {displayText}{" "}
                      {shouldTruncate && (
                        <button
                          className="view-more"
                          onClick={() =>
                            setShowFullId(isFull ? null : todoItem.id)
                          }
                        >
                          {isFull ? "less" : "more"}
                        </button>
                      )}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "7px" }}>
                  <button
                    aria-label="delete"
                    onClick={() => deleteTodo(todoItem.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                  <button onClick={() => editTodo(todoItem)}>
                    <EditIcon fontSize="small" />
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default List;
