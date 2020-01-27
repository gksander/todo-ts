import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../modules/todos.module";

/**
 * Create a new to-do
 */
export const NewTodo: React.FC = () => {
  // Util
  const dispatch = useDispatch();
  // Local state
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  /**
   * Create todo
   */
  const createTheTodo = async () => {
    if (isWorking) return;

    setIsWorking(true);
    try {
      await dispatch(createTodo(title));
    } catch (_) {}
    setIsWorking(false);
  };

  return (
    <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} disabled={isWorking} />
      <button type="button" disabled={!title.trim() || isWorking} onClick={createTheTodo}>
        Submit
      </button>
    </div>
  );
};
