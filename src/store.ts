import {applyMiddleware, combineReducers, createStore} from "redux";
import {todos} from "./modules/todos.module";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Create root store
const RootReducer = combineReducers({ todos });
export type IRootState = ReturnType<typeof RootReducer>;

export const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  RootReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
