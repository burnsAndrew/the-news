import React, { Component } from "react";
import { postNewComment } from "../../api.js";

class PostComment extends Component {
  state = {
    userInput: ""
  };

  handleInput = event => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = event => {
    const { commentsAdder, id, username } = this.props;
    const { userInput } = this.state;
    event.preventDefault();
    this.setState({ userInput: "" });

    const post = {
      username: username,
      body: userInput
    };

    postNewComment(id, post).then(comment => {
      commentsAdder(comment);
    });
  };

  render() {
    const { userInput } = this.state;

    return (
      <div className="postComment">
        <h3>What do you think?</h3>
        <form action="" onSubmit={this.handleSubmit}>
          <textarea
            id="commentInput"
            type="text"
            value={userInput}
            onChange={this.handleInput}
            className="newCommentBox"
            placeholder="Share your thoughts here..."
          />{" "}
          <button className="submitButton" disabled={!userInput}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;
