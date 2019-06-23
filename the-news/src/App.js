import React from "react";
// import logo from "./assets/";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticlesList from "./components/ArticlesList";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <ArticlesList path="/articles" />
      </Router>
    </div>
  );
}

export default App;
