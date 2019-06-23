import React, { Component } from "react";
import { getUser } from "../api";
import { navigate } from "@reach/router";

class LogInBox extends Component {
  state = {
    usernameInput: ""
  };

  render() {
    return (
      <div>
        <div className="LogInBox">
          <h1>Enter Your Username</h1>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleInput} type="text" />
            <button
              className="logInButton"
              disabled={!this.state.usernameInput}
            >
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
    event.preventDefault();
    getUser(this.state.usernameInput)
      .then(user => {
        return this.props.logInUser(user.username);
      })
      .catch(error =>
        navigate("/error", {
          state: { displayerror: "That User Does Not Exist" }
        })
      );
  };
}

export default LogInBox;
