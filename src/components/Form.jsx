import { useState } from "react";
import "../index.css";
function Form({ addTodo, setGrid }) {
  const [text, setTodoText] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const passBoolean = (showFormBoolean) => {
    setGrid(showFormBoolean);
  };

  // Handles submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !description.trim()) return;
    addTodo(text.trim(), description.trim());
    setTodoText("");
    setDescription("");
    setShowForm(false);
    passBoolean(false);
  };
  return (
    <>
      {showForm ? (
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="task-container">
            {/* Todo Task input field*/}
            <h2 className="font-bold">Task:</h2>
            <input
              className="task-field"
              type="text"
              placeholder="Task"
              value={text}
              onChange={(e) => {
                setTodoText(e.target.value);
              }}
            />
            {/* Todo Description input field */}
            <h2 className="font-bold">Description:</h2>
            <textarea
              className="description-field"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <div className="flex flex-row gap-5">
              <button type="submit" className="add-task">
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  passBoolean(false);
                  setTodoText("");
                  setDescription("");
                }}
                className="close-task"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-end">
          <button
            className="new-task"
            onClick={() => {
              setShowForm(true);
              passBoolean(true);
            }}
          >
            + New Task
          </button>
        </div>
      )}
    </>
  );
}

export default Form;
