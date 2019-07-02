import React, { Component } from "react";
import { getAllUsers } from "../../api";
import Loader from "../Loader";

class UsersList extends Component {
  state = {
    users: [],
    isLoading: true
  };

  render() {
    const { users, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="users">
        <h2 id="subHeader">The community</h2>
        <ul className="usersList" key="users">
          {users.map(user => {
            return (
              <li className="userCard" key={user.username}>
                <h4>NAME: {user.name}</h4>
                <h4>USERNAME: {user.username}</h4>
                <img
                  className="avatarImage"
                  src={user.avatar_url}
                  alt="user's avatar"
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getAllUsers().then(users => {
      this.setState({ users: users, isLoading: false });
    });
  }
}

export default UsersList;
