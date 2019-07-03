import React, { Component } from "react";
import { getUser } from "../../api";
import Loader from "../Loader";
import { navigate } from "@reach/router";

class User extends Component {
  state = {
    user: [],
    isLoading: true
  };

  componentDidMount() {
    const { loggedInUser } = this.props;
    getUser(loggedInUser)
      .then(user => {
        this.setState({ user: user, isLoading: false });
      })
      .catch(err =>
        navigate("/error", {
          state: {
            displayerror: "That article doesn't exist"
          }
        })
      );
  }

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="userProfile">
        <h2 className="userUser">Welcome, {user.name}</h2>
        <h3 className="userUsername">Username: {user.username}</h3>
        <img
          className="avatarImage"
          src={user.avatar_url}
          alt="user's avatar"
        />
      </div>
    );
  }
}

export default User;
