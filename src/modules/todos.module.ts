/**
 * To-do shape
 */
import {Action, createAsyncAction, createReducer} from "typesafe-actions";
import {ThunkAction} from "redux-thunk";
import {cloneDeep} from "lodash";
import {transporter} from "../api/transporter";
import {combineReducers} from "redux";
import {IRootState} from "../store";

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
 * Toggling status
 */
const toggleTodoStatusAsync = createAsyncAction(
  "TOGGLE_TODO_COMPLETE_REQUEST",
  "TOGGLE_TODO_COMPLETE_SUCCESS",
  "TOGGLE_TODO_COMPLETE_FAILURE",
)<void, ITodo, Error>();
export const toggleTodoStatus = (id: string, status: boolean): ThunkAction<Promise<any>, IRootState, any, any> => {
  return async dispatch => {
    try {
      dispatch(toggleTodoStatusAsync.request());
      const { data } = await transporter.put(`/todos/${id}`, { isCompleted: status });
      dispatch(toggleTodoStatusAsync.success(data.todo));
    } catch (error) {
      dispatch(toggleTodoStatusAsync.failure(error));
    }
  };
};

/**
 * Deleting to-do
 */
const deleteTodoAsync = createAsyncAction("DELETE_TODO_REQUEST", "DELETE_TODO_SUCCESS", "DELETE_TODO_FAILURE")<
  string,
  void,
  ITodo[]
>();
export const deleteTodo = (id: string): ThunkAction<Promise<any>, IRootState, any, any> => {
  return async (dispatch, getState) => {
    // Make a clone of to-do we're deleting
    const clonedTodos = cloneDeep(getState().todos.items);
    try {
      dispatch(deleteTodoAsync.request(id));
      await transporter.delete(`/todos/${id}`);
      dispatch(deleteTodoAsync.success());
    } catch (error) {
      dispatch(deleteTodoAsync.failure(clonedTodos));
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
  .handleAction(createTodoAsync.success, (state, action) => [...state, action.payload])
  .handleAction(toggleTodoStatusAsync.success, (state, action) =>
    state.map(todo => (todo.id === action.payload.id ? action.payload : todo)),
  )
  .handleAction(deleteTodoAsync.request, (state, action) => state.filter(todo => todo.id !== action.payload))
  .handleAction(deleteTodoAsync.failure, (state, action) => action.payload);

/**
 * Todos reducer
 */
export const todos = combineReducers({ isLoadingItems, items });
