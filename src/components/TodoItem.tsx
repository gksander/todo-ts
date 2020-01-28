import React from "react";
import {useDispatch} from "react-redux";
import {deleteTodo, ITodo, updateTodo} from "../modules/todos.module";

/**
 * Displaying a To-do item
 */
export const TodoItem: React.FC<{ item: ITodo }> = ({ item }) => {
  // Util
  const dispatch = useDispatch();

  /**
   * Delete
   */
  const deleteItem = async () => {
    dispatch(deleteTodo(item.id));
  };

  /**
   * Toggle state
   */
  const toggleState = async () => {
    dispatch(
      updateTodo({
        ...item,
        isCompleted: !item.isCompleted,
      }),
    );
  };

  /**
   * Markup
   */
  return (
    <li>
      {item.title}
      <button type="button" onClick={toggleState}>
        {item.isCompleted ? "Uncheck" : "Check"}
      </button>
      <button type="button" onClick={deleteItem}>
        Delete
      </button>
    </li>
  );
};
