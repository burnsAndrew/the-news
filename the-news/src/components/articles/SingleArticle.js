import React, { Component } from "react";
import { navigate } from "@reach/router";
import { getSingleArticle, deleteArticle } from "../../api";
import Comments from "../comments/Comments";
import Voting from "../Voting";

class SingleArticle extends Component {
  state = {
    article: []
  };

  handleDelete = id => {
    deleteArticle(id).then(article => {
      this.setState({ article: article });
    });
  };

  render() {
    const { article } = this.state;
    const { loggedInUser, article_id } = this.props;
    return (
      <div>
        <div className="singleArticle">
          <h2>{article.title}</h2>
          <h3 className="author">Written By: {article.author}</h3>
          <h5>{article.body}</h5>
          <Voting
            votes={article.votes}
            id={article.article_id}
            type={"article"}
            loggedInUser={loggedInUser}
          />
          {loggedInUser === article.author && (
            <button
              id="article.article_id"
              className="deleteButton"
              onClick={() => {
                this.handleDelete(article.article_id);
              }}
            >
              Delete
            </button>
          )}
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
    getSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article: article });
      })
      .catch(err =>
        navigate("/error", {
          state: { displayerror: "That Article Does Not Exist" }
        })
      );
  }
}

export default SingleArticle;
