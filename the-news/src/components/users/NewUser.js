import React, { Component } from "react";
import { postNewUser } from "../../api";

// this needs work - basics set up but the actual functionality is not finished
// dave recommends w3 schools for img upload - look into this

class NewUser extends Component {
  state = {
    username: "",
    name: "",
    avatar_url: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.eventDefault();
    this.setState({ username: "", name: "", avatar_url: "" });

    const post = {
      username: this.state.username,
      name: this.state.name,
      avatar_url: this.state.avatar_url
    };

    postNewUser(this.props.id, post).then(user => {
      return user;
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="NewUserForm">
        <label>Username: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="username"
          id="usernameInput"
          placeholder="Create a cool username..."
        />{" "}
        <label>Name: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          id="nameInput"
          placeholder="Enter your name..."
        />{" "}
        <label>Avatar: </label>
        <input
          name="avatar_url"
          id="avatar_urlInput"
          placeholder="Enter your avatar details..."
        />{" "}
        <button
          className="submitNewUser"
          disabled={!this.state.username || !this.state.name}
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default NewUser;
