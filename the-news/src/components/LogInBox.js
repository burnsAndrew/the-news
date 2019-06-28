import React, { Component } from "react";
import { getUser } from "../api";
import { navigate } from "@reach/router";

class LogInBox extends Component {
  state = {
    usernameInput: ""
  };

  render() {
    const { usernameInput } = this.state;
    return (
      <div>
        <div className="logInBox">
          <h2>Enter Your Username:</h2>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} type="text" />
            <button className="logInButton" disabled={!usernameInput}>
              Log In
            </button>
          </form>
        </div>
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
            displayerror:
              "That User Does Not Exist. Click above to create an account"
          }
        })
      );
  };
}

export default LogInBox;
