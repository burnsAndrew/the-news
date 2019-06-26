import React, { Component } from "react";
import { getCommentsByArticle, deleteComment } from "../../api";
import Voting from "../Voting";
import PostComment from "./PostComment";

class Comments extends Component {
  state = {
    comments: []
  };

  handleDelete = id => {
    deleteComment(id).then(() => {
      const filteredComments = this.state.comments.filter(comment => {
        return comment.comment_id !== id;
      });
      this.setState({ comments: filteredComments });
    });
  };

  render() {
    const { loggedInUser, id } = this.props;
    return (
      <div className="comments">
        <h2>Comments</h2>
        {loggedInUser ? (
          <PostComment
            username={loggedInUser}
            id={id}
            commentsAdder={this.commentsAdder}
          />
        ) : (
          <h3>Please log in to join the discussion</h3>
        )}
        <ul className="commentsList" key="comments">
          {this.state.comments.map(comment => {
            return (
              <li className="commentCard" key={comment.comment_id}>
                <h4 className="author">Comment By: {comment.author}</h4>
                <h5>{comment.body}</h5>
                <div className="voting">
                  <Voting
                    votes={comment.votes}
                    id={comment.comment_id}
                    loggedInUser={loggedInUser}
                    type={"comment"}
                  />
                  {loggedInUser === comment.author && (
                    <button
                      id="comment.comment_id"
                      className="deleteButton"
                      onClick={() => {
                        this.handleDelete(comment.comment_id);
                      }}
                    >
                      Delete
                    </button>
                  )}
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

  commentsAdder = newComment => {
    this.setState(prevState => {
      return { comments: [newComment, ...prevState.comments] };
    });
  };
}

export default Comments;
