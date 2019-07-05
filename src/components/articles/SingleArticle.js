import React, { Component } from "react";
import { navigate } from "@reach/router";
import { getSingleArticle } from "../../api";
import Comments from "../comments/Comments";
import Voting from "../Voting";
import Loader from "../Loader";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true
  };

  render() {
    const { article, isLoading } = this.state;
    const { loggedInUser, article_id } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div>
        <div className="singleArticle">
          <h2 className="singleArticleTitle">{article.title}</h2>
          <h3 className="author">Written by: {article.author}</h3>
          <h4>Topic: {article.topic}</h4>
          <h5>{article.body}</h5>
          <Voting
            votes={article.votes}
            id={article.article_id}
            type={"article"}
            loggedInUser={loggedInUser}
          />
          <h5>Number of comments: {article.comment_count}</h5>
        </div>
        <Comments
          path="/articles/:article_id"
          id={article_id}
          loggedInUser={loggedInUser}
        />
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id)
      .then(article => {
        this.setState({ article: article, isLoading: false });
      })
      .catch(err =>
        navigate("/error", {
          state: { displayerror: "That Article Does Not Exist" }
        })
      );
  }
}

export default SingleArticle;
