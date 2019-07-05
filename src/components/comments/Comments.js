import React, { Component } from "react";
import { getCommentsByArticle, deleteComment } from "../../api";
// import { navigate } from "@reach/router";
import Voting from "../Voting";
import PostComment from "./PostComment";
import Loader from "../Loader";
import Button from "@material-ui/core/Button";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  handleDelete = id => {
    deleteComment(id).then(() => {
      const filteredComments = this.state.comments.filter(comment => {
        return comment.comment_id !== id;
      });
      this.setState({ comments: filteredComments });
    });
    // .catch(err =>
    //   navigate("/error", {
    //     state: {
    //       displayerror: "That comment doesn't exist"
    //     }
    //   })
    // );
  };

  render() {
    const { comments, isLoading } = this.state;
    const { loggedInUser, id } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div className="comments">
        <h2 id="subHeader">Comments</h2>
        {loggedInUser ? (
          <PostComment
            username={loggedInUser}
            id={id}
            commentsAdder={this.commentsAdder}
          />
        ) : (
          <h4>Please log in to join the discussion</h4>
        )}
        <ul className="commentsList" key="comments">
          {comments.map(comment => {
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
                    <Button
                      size="small"
                      variant="contained"
                      id="comment.comment_id"
                      className="deleteButton"
                      onClick={() => {
                        this.handleDelete(comment.comment_id);
                      }}
                    >
                      Delete
                    </Button>
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
      this.setState({ comments: comments, isLoading: false });
    });
    // .catch(err =>
    //   navigate("/error", {
    //     state: {
    //       displayerror: "That does not exist"
    //     }
    //   })
    // );
  }

  commentsAdder = newComment => {
    this.setState(prevState => {
      return {
        comments: [newComment, ...prevState.comments]
      };
    });
  };
}

export default Comments;
