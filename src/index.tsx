import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createMockApi} from "./api/mock-api";
import {persistor, store} from "./store";
import {CSSReset, ThemeProvider} from "@chakra-ui/core";
import {theme} from "./app-theme";
import {PersistGate} from "redux-persist/integration/react";

// Mock API
createMockApi();

// Mount the app
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CSSReset />
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
