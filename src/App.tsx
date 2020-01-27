import React, { useEffect, useState } from "react";
import { transporter } from "./api/transporter";
import { createTodo, fetchTodos, ITodo } from "./modules/todos.module";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./store";
import { TodoItem } from "./components/TodoItem";
import { NewTodo } from "./components/NewTodo";

const App: React.FC = () => {
  // Util
  const dispatch = useDispatch();
  // Selectors
  const isLoadingItems = useSelector<IRootState, boolean>(state => state.todos.isLoadingItems);
  const items = useSelector<IRootState, ITodo[]>(state => state.todos.items);

  /**
   * On mount, fetch some todos
   */
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  /**
   * Loading
   */
  if (isLoadingItems) {
    return <div>LOADING!</div>;
  }

  /**
   * Show items
   */
  return (
    <div className="App">
      <ul>
        {items.map(todo => (
          <TodoItem item={todo} key={todo.id} />
        ))}
      </ul>
      <NewTodo />
    </div>
  );
};

export default App;
