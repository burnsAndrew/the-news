import React, { Component } from "react";
import { getAllUsers, deleteUser } from "../../api";

class UsersList extends Component {
  state = {
    users: []
  };

  handleDelete = id => {
    deleteUser(id).then(() => {
      const filteredUsers = this.state.users.filter(user => {
        return user.username !== id;
      });
      this.setState({ users: filteredUsers });
    });
  };

  render() {
    const { loggedInUser } = this.props;
    return (
      <div className="users">
        <h2>The community</h2>
        <ul className="usersList" key="users">
          {this.state.users.map(user => {
            return (
              <li className="userCard" key={user.username}>
                <h4>NAME: {user.name}</h4>
                <h4>USERNAME: {user.username}</h4>
                <img src={user.avatar_url} alt="user's avatar" />
                {loggedInUser === user.username && (
                  <button
                    id="user.username"
                    className="deleteButton"
                    onClick={() => {
                      this.handleDelete(user.username);
                    }}
                  >
                    Close Account
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getAllUsers().then(users => {
      this.setState({ users: users });
    });
  }
}

export default UsersList;
