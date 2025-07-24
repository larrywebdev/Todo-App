import { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import Search from "./components/Search";
function App() {
  const [todos, setTodos] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayGrid, setDisplayGrid] = useState(false);

  // Load once
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && Array.isArray(savedTodos)) {
      setTodos(savedTodos);
    }
    setIsInitialLoad(false);
  }, []);

  // Save todos only after initial load
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isInitialLoad]);

  // Adds a to do list to the array => todos
  const addTodo = (todoText, todoDescription) => {
    setTodos([
      ...todos,
      { id: Date.now(), todoText, todoDescription, completed: false },
    ]);
  };
  // Deletes a to do item from the list
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todoItem) => {
        return todoItem.id !== id;
      })
    );
  };

  // Function to toggle completed between true and false
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.todoText.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      todo.todoDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim())
  );
  const setGrid = (showFormBoolean) => {
    setDisplayGrid(showFormBoolean);
  };

  function saveEditedTodo(id, newTask, newDescription) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, todoText: newTask, todoDescription: newDescription }
          : todo
      )
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8">Todo List</h1>
      <div className="todo-panel">
        <div
          className="search-grid"
          style={displayGrid ? { display: "grid" } : { display: "flex" }}
        >
          <Form addTodo={addTodo} setGrid={setGrid} />
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <List
          filteredTodos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
          saveEditedTodo={saveEditedTodo}
        />
      </div>
    </>
  );
}

export default App;
