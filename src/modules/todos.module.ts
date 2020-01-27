/**
 * To-do shape
 */
import { createAsyncAction, createReducer, Action } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { transporter } from "../api/transporter";
import { combineReducers } from "redux";
import { IRootState } from "../store";
import { createSelector } from "reselect";

export interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}

/**
 * Action to fetch todos
 */
export const fetchTodosAsync = createAsyncAction("FETCH_TODOS_REQUEST", "FETCH_TODOS_SUCCESS", "FETCH_TODOS_FAILURE")<
  void,
  ITodo[],
  Error
>();
export const fetchTodos = (
  category: "all" | "complete" | "incomplete" = "all",
): ThunkAction<Promise<any>, IRootState, any, any> => {
  return async dispatch => {
    try {
      dispatch(fetchTodosAsync.request());
      const { data } = await transporter.get(`todos/${category}`);
      dispatch(fetchTodosAsync.success(data.todos));
    } catch (error) {
      dispatch(fetchTodosAsync.failure(error));
    }
  };
};

/**
 * Create a to-do
 */
const createTodoAsync = createAsyncAction("CREATE_TODO_REQUEST", "CREATE_TODO_SUCCESS", "CREATE_TODO_FAILURE")<
  void,
  ITodo,
  Error
>();
export const createTodo = (title: string): ThunkAction<Promise<any>, IRootState, any, any> => {
  return async dispatch => {
    try {
      dispatch(createTodoAsync.request());
      const { data } = await transporter.post(`todos`, { title });
      dispatch(createTodoAsync.success(data.todo));
    } catch (error) {
      dispatch(createTodoAsync.failure(error));
      throw new Error(error);
    }
  };
};

/**
 * Loading state
 */
const isLoadingItems = createReducer<boolean, Action>(false)
  .handleAction([fetchTodosAsync.request], state => true)
  .handleAction([fetchTodosAsync.success, fetchTodosAsync.failure], state => false);

/**
 * Todos
 */
const items = createReducer<ITodo[], Action>([])
  .handleAction([fetchTodosAsync.success], (state, action) => action.payload)
  .handleAction(createTodoAsync.success, (state, action) => [...state, action.payload]);

/**
 * Todos reducer
 */
export const todos = combineReducers({ isLoadingItems, items });
