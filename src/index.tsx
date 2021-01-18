import "core-js";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";
import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import store from "./store";

(React as any).icons = icons;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
