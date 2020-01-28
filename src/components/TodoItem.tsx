import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, ITodo, updateTodo } from "../modules/todos.module";

/**
 * Displaying a To-do item
 */
export const TodoItem: React.FC<{ item: ITodo }> = ({ item }) => {
  // Util
  const dispatch = useDispatch();
  // Local state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  /**
   * Delete
   */
  const deleteItem = () => {
    dispatch(deleteTodo(item.id));
  };

  /**
   * Toggle state
   */
  const toggleState = () => {
    dispatch(
      updateTodo({
        ...item,
        isCompleted: !item.isCompleted,
      }),
    );
  };

  /**
   * Editing actions
   */
  // Start editing
  const startEdit = () => {
    setNewTitle(item.title);
    setIsEditing(true);
  };

  // Cancel edit
  const cancelEdit = () => {
    setIsEditing(false);
  };

  // Save edit
  const saveEdit = () => {
    dispatch(
      updateTodo({
        ...item,
        title: newTitle,
      }),
    );
    setIsEditing(false);
  };

  /**
   * Markup
   */
  return (
    <li>
      {isEditing ? (
        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      ) : (
        <span>{item.title}</span>
      )}
      {isEditing ? (
        <>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
          <button type="button" onClick={saveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={toggleState}>
            {item.isCompleted ? "Uncheck" : "Check"}
          </button>
          <button type="button" onClick={startEdit}>
            Edit
          </button>
          <button type="button" onClick={deleteItem}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};
