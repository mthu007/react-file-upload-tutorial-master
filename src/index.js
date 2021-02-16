import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DiffResults from "./DiffResults";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
  <App />
</React.StrictMode>,
  // <React.StrictMode>
  //   <DiffResults />
  // </React.StrictMode>,
  document.getElementById("root")
);
