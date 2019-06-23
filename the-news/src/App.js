import React from "react";
// import logo from "./assets/";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <p>This is App.</p>
    </div>
  );
}

export default App;
