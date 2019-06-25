import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Topics from "./components/topics/Topics";
import ArticlesList from "./components/articles/ArticlesList";
import SingleArticle from "./components/articles/SingleArticle";
import User from "./components/users/UserProfile";
import NewUser from "./components/users/NewUser";
import LogInBox from "./components/LogInBox";

class App extends Component {
  state = {
    loggedInUser: ""
  };

  logInUser = username => {
    this.setState({ loggedInUser: username }, () => {
      navigate("/home");
    });
    localStorage.setItem("loggedInUser", this.state.loggedInUser);
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "" }, () => navigate("/home"));
    localStorage.setItem("loggedInUser", "");
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Nav
          loggedInUser={this.state.loggedInUser}
          logOutUser={this.logOutUser}
        />
        <Router>
          <Home path="/" />
          <Topics path="/topics" />

          <LogInBox path="/login" logInUser={this.logInUser} />
          <NewUser path="/createaccount" />
          <ArticlesList
            path="/articles"
            loggedInUser={this.state.loggedInUser}
          />
          <ArticlesList path="/articles/topic/:topic" />
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
