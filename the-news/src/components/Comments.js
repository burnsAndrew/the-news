import React, { Component } from "react";
import { getCommentsByArticle } from "../api";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    return (
      <div>
        <h1>Comments</h1>
        <ul className="comments">
          {this.state.comments.map(comment => {
            return (
              <li className="comment" key={comment.comment_id}>
                <h2>Comment By: {comment.author}</h2>
                <h4>{comment.body}</h4>
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
