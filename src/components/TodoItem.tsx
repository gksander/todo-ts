import React, { useState } from "react";
import { ITodo } from "../modules/todos.module";
import { useDispatch } from "react-redux";

/**
 * Displaying a To-do item
 */
export const TodoItem: React.FC<{ item: ITodo }> = ({ item }) => {
  // Util
  const dispatch = useDispatch();
  // Local state
  const [isTogglingState, setIsTogglingState] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  /**
   * Delete
   */
  const deleteItem = async () => {};

  /**
   * Toggle state
   */
  const toggleState = async () => {};

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
