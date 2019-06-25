import React, { Component } from "react";
import { getUser } from "../../api";

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
        <h2>Welcome, {user.name}</h2>
        <h3>Username: {user.username}</h3>
        <img src={user.avatar_url} alt="user's avatar" />
      </div>
    );
  }
}

export default User;
