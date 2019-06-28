import React, { Component } from "react";
import { navigate } from "@reach/router";
import { postNewUser } from "../../api";

class NewUser extends Component {
  state = {
    usernameInput: "",
    nameInput: "",
    avatar_urlInput: ""
  };

  render() {
    const { usernameInput, nameInput, avatar_urlInput } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        id="NewUserForm"
        className="newUserForm"
      >
        <label>Username: </label>
        <input
          onChange={this.handleInput}
          type="text"
          name="username"
          value={usernameInput}
          placeholder="Create a cool username..."
        />{" "}
        <label>Name: </label>
        <input
          onChange={this.handleInput}
          type="text"
          name="name"
          value={nameInput}
          placeholder="Enter your name..."
        />{" "}
        <label>Avatar: </label>
        <input
          onChange={this.handleInput}
          type="text"
          name="avatar_url"
          value={avatar_urlInput}
          placeholder="Your avatar details (optional)"
        />{" "}
        <button
          className="submitButton"
          disabled={!usernameInput || !nameInput}
        >
          Submit
        </button>
      </form>
    );
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { userAdder } = this.props;
    const { usernameInput, nameInput, avatar_urlInput } = this.state;
    event.preventDefault();

    const post = {
      username: usernameInput,
      name: nameInput,
      avatar_url: avatar_urlInput
    };

    postNewUser(post).then(user => {
      userAdder(user);
      navigate("/community");
    });
  };
}

export default NewUser;
