import React, { Component } from "react";
import { getUser } from "../api";

class User extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    getUser(this.props.loggedInUser).then(user => {
      this.setState({ user: user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="userProfile">
        <h1>Welcome, {user.name}</h1>
        <h2>Username: {user.username}</h2>
        <img src={user.avatar_url} alt="user's avatar" />
      </div>
    );
  }
}

export default User;
