import React, { Component } from "react";
import { getAllUsers, deleteUser } from "../../api";
import Loader from "../Loader";

class UsersList extends Component {
  state = {
    users: [],
    isLoading: true
  };

  handleDelete = id => {
    const { users } = this.state;
    deleteUser(id).then(() => {
      const filteredUsers = users.filter(user => {
        return user.username !== id;
      });
      this.setState({ users: filteredUsers, isLoading: false });
    });
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

  userAdder = newUser => {
    this.setState(prevState => {
      return {
        users: [newUser, ...prevState.users]
      };
    });
  };
}

export default UsersList;
