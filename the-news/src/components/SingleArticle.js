import React, { Component } from "react";
import { getSingleArticle } from "../api";
import Comments from "./Comments";

class SingleArticle extends Component {
  state = {
    article: []
  };

  render() {
    const { article } = this.state;
    return (
      <div>
        <div className="singleArticle">
          <h1>{article.title}</h1>
          <h2>Written By: {article.author}</h2>
          <h4>{article.body}</h4>
        </div>
        <Comments
          path="/articles/:article_id"
          id={this.props.article_id}
          loggedInUser={this.props.loggedInUser}
        />
      </div>
    );
  }

  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article => {
      this.setState({ article: article });
    });
  }
}

export default SingleArticle;
