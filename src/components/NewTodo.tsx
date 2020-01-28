import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createTodo} from "../modules/todos.module";

/**
 * Create a new to-do
 */
export const NewTodo: React.FC = () => {
  // Util
  const dispatch = useDispatch();
  // Local state
  const [title, setTitle] = useState<string>("");

  /**
   * Create to-do
   */
  const createTheTodo = async () => {
    dispatch(createTodo(title));
    setTitle("");
  };

  return (
    <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <button type="button" disabled={!title.trim()} onClick={createTheTodo}>
        Submit
      </button>
    </div>
  );
};
