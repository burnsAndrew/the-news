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
import LogInBox from "./components/LogInBox";
import Error from "./components/Error";
import NoMatch from "./NoMatch";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  state = {
    loggedInUser: ""
  };

  logInUser = username => {
    const { loggedInUser } = this.state;
    this.setState({ loggedInUser: username }, () => {
      navigate("/");
    });
    localStorage.setItem("loggedInUser", loggedInUser);
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "" }, () => navigate("/"));
    localStorage.setItem("loggedInUser", "");
  };

  render() {
    const { loggedInUser } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App" key="App">
          <Header />
          <Nav loggedInUser={loggedInUser} logOutUser={this.logOutUser} />
          <Router>
            <Home path="/" />
            <Topics path="/topics" loggedInUser={loggedInUser} />
            <LogInBox path="/login" logInUser={this.logInUser} />
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
            <NoMatch default />
          </Router>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (isLoggedIn) this.setState({ loggedInUser: isLoggedIn });
  }
}

export default App;
