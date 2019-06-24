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
    event.preventDefault();
    this.setState({ userInput: "" });

    const post = {
      username: this.props.username,
      body: this.state.userInput
    };

    postNewComment(this.props.id, post).then(comment => {
      return comment;
    });
  };

  render() {
    return (
      <div className="postComment">
        <h2>What do you think?</h2>
        <form action="" onSubmit={this.handleSubmit}>
          <textarea
            id="commentInput"
            type="text"
            value={this.state.userInput}
            onChange={this.handleInput}
            className="newCommentBox"
            placeholder="Share your thoughts here..."
          />{" "}
          <button className="submitComment" disabled={!this.state.userInput}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;
