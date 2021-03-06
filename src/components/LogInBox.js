import React, { Component } from "react";
import { getUser } from "../api";
import { navigate } from "@reach/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class LogInBox extends Component {
  state = {
    usernameInput: ""
  };

  render() {
    const { usernameInput } = this.state;
    return (
      <div>
        <form className="logInBox" onSubmit={this.handleSubmit}>
          <TextField
            id="standard-helperText"
            label="Enter your username"
            helperText="EG: tickle122"
            margin="normal"
            onChange={this.handleInput}
          />
          <Button
            variant="outlined"
            size="small"
            className="logInButton"
            disabled={!usernameInput}
            onClick={this.handleSubmit}
          >
            Log In
          </Button>
        </form>
      </div>
    );
  }

  handleInput = event => {
    this.setState({ usernameInput: event.target.value });
  };

  handleSubmit = event => {
    const { usernameInput } = this.state;
    const { logInUser } = this.props;
    event.preventDefault();
    getUser(usernameInput)
      .then(user => {
        return logInUser(user.username);
      })
      .catch(err =>
        navigate("/error", {
          state: {
            displayerror: "That person is not a member of our community."
          }
        })
      );
  };
}

export default LogInBox;
