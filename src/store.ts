import { applyMiddleware, combineReducers, createStore } from "redux";
import { todos } from "./modules/todos.module";
import thunk from "redux-thunk";

// Create root store
const RootStore = combineReducers({ todos });
export type IRootState = ReturnType<typeof RootStore>;

export const store = createStore(RootStore, applyMiddleware(thunk));
