import React from "react";
// import logo from "./assets/";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import User from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Topics path="/topics" />
        <ArticlesList path="/articles" />
        <SingleArticle path="/articles/:article_id" />
        <User path="/user" />
      </Router>
    </div>
  );
}

export default App;
