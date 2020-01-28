import { Action, createAction, createReducer } from "typesafe-actions";
import { IRootState } from "../store";
import { uuid } from "uuidv4";

/**
 * Types
 */
export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}
interface TodoState {
  [key: string]: ITodo;
}

/**
 * Actions
 */
// Create a to-do
export const createTodo = createAction("CREATE_TODO", (title: string) => ({ id: uuid(), title, isCompleted: false }))();

// Update a to-do
export const updateTodo = createAction("UPDATE_TODO", (todo: ITodo) => todo)();

// Delete a to-do
export const deleteTodo = createAction("DELETE_TODO", (id: string) => id)();

/**
 * Todos reducer
 */
export const todos = createReducer<TodoState, Action>({})
  .handleAction([createTodo, updateTodo], (state, action) => ({
    ...state,
    [action.payload.id]: action.payload,
  }))
  .handleAction(deleteTodo, (state, action) => {
    const newState = { ...state };
    delete newState[action.payload];
    return newState;
  });

/**
 * Selectors
 */
// Todos as an array
export const selectTodosAsArray = (state: IRootState): ITodo[] => Object.keys(state.todos).map(key => state.todos[key]);
