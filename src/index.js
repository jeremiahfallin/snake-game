import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Game from "./components/Snake";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Snake!</h1>
      <Game />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
