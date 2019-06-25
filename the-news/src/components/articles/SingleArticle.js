import React, { Component } from "react";
import { getSingleArticle } from "../../api";
import Comments from "../comments/Comments";
import Voting from "../Voting";

class SingleArticle extends Component {
  state = {
    article: []
  };

  render() {
    const { article } = this.state;
    return (
      <div>
        <div className="singleArticle">
          <h2>{article.title}</h2>
          <h3>Written By: {article.author}</h3>
          <h5>{article.body}</h5>
          <Voting
            votes={article.votes}
            id={article.article_id}
            type={"article"}
            loggedInUser={this.props.loggedInUser}
          />
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
