import React, { Component } from "react";
import { postNewComment } from "../../api.js";
import TextField from "@material-ui/core/TextField";

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
          <TextField
            id="outlined-full-width"
            label="Comment"
            value={userInput}
            onChange={this.handleInput}
            style={{ margin: 8 }}
            placeholder="Share your thoughts here..."
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <button className="submitButton" disabled={!userInput}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;
