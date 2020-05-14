import "antd/dist/antd.css";
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { Shopping } from "./pages/shopping";

function App() {
  return (
    <div className="App">
      <Shopping />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
