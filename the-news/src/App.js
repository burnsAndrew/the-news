import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Topics from "./components/topics/Topics";
import Home from "./components/Home";
import ArticlesList from "./components/articles/ArticlesList";
import PostArticle from "./components/articles/PostArticle";
import SingleArticle from "./components/articles/SingleArticle";
import User from "./components/users/UserProfile";
import UsersList from "./components/users/UsersList";
import NewUser from "./components/users/NewUser";
import LogInBox from "./components/LogInBox";
import Error from "./components/Error";
import Loader from "./components/Loader";

class App extends Component {
  state = {
    loggedInUser: "",
    isLoading: true
  };

  logInUser = username => {
    const { loggedInUser } = this.state;
    this.setState({ loggedInUser: username, isLoading: false }, () => {
      navigate("/home");
    });
    localStorage.setItem("loggedInUser", loggedInUser);
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "", isLoading: false }, () =>
      navigate("/home")
    );
    localStorage.setItem("loggedInUser", "");
  };

  render() {
    const { loggedInUser, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="App" key="App">
        <Header />
        <Nav loggedInUser={loggedInUser} logOutUser={this.logOutUser} />

        <Router>
          <Home path="/" />
          <Topics path="/topics" loggedInUser={loggedInUser} />
          <LogInBox path="/login" logInUser={this.logInUser} />
          <NewUser path="/createaccount" /*loggedInUser={loggedInUser}*/ />
          <ArticlesList path="/articles/*" loggedInUser={loggedInUser} />
          <ArticlesList
            path="/articles/topic/:topic"
            loggedInUser={loggedInUser}
          />
          <PostArticle path="/postArticle" loggedInUser={loggedInUser} />
          <SingleArticle
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <User path="/user" loggedInUser={loggedInUser} />
          <UsersList path="/community" loggedInUser={loggedInUser} />
          <Error path="/error" />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (isLoggedIn)
      this.setState({ loggedInUser: isLoggedIn, isLoading: false });
  }
}

export default App;
