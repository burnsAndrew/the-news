import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import User from "./components/UserProfile";
import LogInBox from "./components/LogInBox";

class App extends Component {
  state = {
    loggedInUser: ""
  };

  logInUser = username => {
    this.setState({ loggedInUser: username }, () => {
      navigate("/articles");
    });
    localStorage.setItem("loggedInUser", this.state.loggedInUser);
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "" }, () => navigate("/login"));
    localStorage.setItem("loggedInUser", "");
  };

  render() {
    return (
      <div className="App">
        <Header
          loggedInUser={this.state.loggedInUser}
          logOutUser={this.logOutUser}
        />
        <Router>
          <Home path="/" />
          <Topics path="/topics" />
          <LogInBox path="/login" logInUser={this.logInUser} />
          <ArticlesList path="/articles" />
          <SingleArticle
            path="/articles/:article_id"
            loggedInUser={this.state.loggedInUser}
          />
          <User path="/user" loggedInUser={this.state.loggedInUser} />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (isLoggedIn) this.setState({ loggedInUser: isLoggedIn });
  }
}

export default App;
