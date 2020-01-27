import React, {useState} from "react";
import {deleteTodo, ITodo, toggleTodoStatus} from "../modules/todos.module";
import {useDispatch} from "react-redux";

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
  const deleteItem = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteTodo(item.id));
    } catch (_) {}
  };

  /**
   * Toggle state
   */
  const toggleState = async () => {
    if (isTogglingState) return;
    setIsTogglingState(true);
    try {
      await dispatch(toggleTodoStatus(item.id, !item.isCompleted));
    } catch (_) {}
    setIsTogglingState(false);
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
