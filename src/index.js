import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import history from "./history/history";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
