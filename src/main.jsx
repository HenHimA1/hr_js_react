import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Stores from "./stores";
import Pages from "./pages";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Stores >
      <Pages />
    </Stores>
  </React.StrictMode>
);
