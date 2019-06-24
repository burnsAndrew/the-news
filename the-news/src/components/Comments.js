import React, { Component } from "react";
import { getCommentsByArticle } from "../api";
import Voting from "./Voting";
import PostComment from "./PostComment";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    return (
      <div>
        <h1>Comments</h1>
        {this.props.loggedInUser ? (
          <PostComment
            username={this.props.loggedInUser}
            id={this.props.id}
            addComment={this.addComment}
          />
        ) : (
          <h2>Please log in to add a comment</h2>
        )}
        <ul className="comments">
          {this.state.comments.map(comment => {
            return (
              <li className="comment" key={comment.comment_id}>
                <h2>Comment By: {comment.author}</h2>
                <h4>{comment.body}</h4>
                <div className="voting">
                  <Voting
                    votes={comment.votes}
                    id={comment.comment_id}
                    loggedInUser={this.props.loggedInUser}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getCommentsByArticle(this.props.id).then(comments => {
      this.setState({ comments: comments });
    });
  }
}

export default Comments;
