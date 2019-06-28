import React, { Component } from "react";
import { navigate } from "@reach/router";
import { postNewUser } from "../../api";
import Loader from "../Loader";

class NewUser extends Component {
  state = {
    username: "",
    name: "",
    avatar_url: "",
    isLoading: true
  };

  render() {
    const { username, name, avatar_url, isLoading } = this.state;
    // const { loggedInUser } = this.props;
    if (isLoading) return <Loader />;
    return (
      <form
        onSubmit={this.handleSubmit}
        id="NewUserForm"
        className="newUserForm"
      >
        <label>Username: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="username"
          value={username}
          placeholder="Create a cool username..."
        />{" "}
        <label>Name: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          value={name}
          placeholder="Enter your name..."
        />{" "}
        <label>Avatar: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="avatar_url"
          value={avatar_url}
          placeholder="Your avatar details (optional)"
        />{" "}
        <button className="submitButton" disabled={!username || !name}>
          Submit
        </button>
      </form>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, isLoading: false });
  };

  handleSubmit = event => {
    event.eventDefault();
    const { username, name, avatar_url } = this.state;
    postNewUser(username, name, avatar_url).then(user => {
      this.setState({
        username: "",
        name: "",
        avatar_url: "",
        isLoading: false
      });
      navigate(`/users/${username}`);
    });
  };
}

export default NewUser;
