import React, { useEffect, useState } from "react";
import axios from "axios";

interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  // Local state
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isWorking, setIsWorking] = useState<boolean>(false);

  /**
   * On mount, fetch some todos
   */
  useEffect(() => {
    fetch("/api/todos/all")
      .then(res => res.json())
      .then(res => setTodos(res.todos));
  }, []);

  /**
   * Create a to-do
   */
  const createTodo = () => {
    if (isWorking) return;

    setIsWorking(true);

    return axios
      .post("/api/todos", {
        title: newTodo,
      })
      .then(res => res.data)
      .then(data => {
        setTodos(prevVal => [...prevVal, data.todo]);
        setNewTodo("");
      })
      .finally(() => {
        setIsWorking(false);
      });
  };

  /**
   * Mark complete
   */
  const markTodoComplete = (id: string, val: boolean) => {
    return axios
      .put(`/api/todos/${id}`, { isCompleted: val })
      .then(res => res.data)
      .then(data => {
        setTodos(prevVal => prevVal.map(todo => todo.id === id ? data.todo : todo))
      });
  };

  /**
   * Delete a TODO
   */
  const deleteTodo = (id: string) => {
    return axios.delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(prevVal => prevVal.filter(todo => todo.id !== id))
      })
  }

  return (
    <div className="App">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button type="button" onClick={() => markTodoComplete(todo.id, !todo.isCompleted)}>
              {todo.isCompleted ? "Uncheck" : "Check"}
            </button>
            <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} disabled={isWorking} />
        <button type="button" disabled={!newTodo.trim() || isWorking} onClick={createTodo}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
