import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import SqlLoad from "./SqlLoad";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SqlLoad />
    <App />
  </React.StrictMode>,
  rootElement
);
