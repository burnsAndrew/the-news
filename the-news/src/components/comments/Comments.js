import React, { Component } from "react";
import { getCommentsByArticle, deleteComment } from "../../api";
import Voting from "../Voting";
import PostComment from "./NewComment";

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

  //need a componentDidUpdate here, to make it render??

  addNewComment = comment => {
    this.setState(prevState => {
      const newComments = prevState.comments.map(comment => {
        return { ...comment };
      });
      return { comments: [comment, ...newComments] };
    });
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
          <h2>Please log in to join the discussion</h2>
        )}
        <ul className="comments">
          {this.state.comments.map(comment => {
            return (
              <li className="comment" key={comment.comment_id}>
                <h3>Comment By: {comment.author}</h3>
                <h4>{comment.body}</h4>
                <div className="voting">
                  <Voting
                    votes={comment.votes}
                    id={comment.comment_id}
                    loggedInUser={this.props.loggedInUser}
                  />
                  {this.props.loggedInUser === comment.author && (
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
}

export default Comments;