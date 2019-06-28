import React, { Component } from "react";
import { getUser } from "../../api";
import Loader from "../Loader";

class User extends Component {
  state = {
    user: [],
    isLoading: true
  };

  componentDidMount() {
    const { loggedInUser } = this.props;
    getUser(loggedInUser).then(user => {
      this.setState({ user: user, isLoading: false });
    });
  }

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loader />;
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
