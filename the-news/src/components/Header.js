import React from "react";
import { Link } from "@reach/router";

const Header = props => {
  return (
    <header>
      <div className="nav">
        <h1>THE News</h1>
      </div>
      <nav>
        <ul className="mainMenu">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/articles">
            <li>Articles</li>
          </Link>
          <Link to="/topics">
            <li>Topics</li>
          </Link>
          {!props.loggedInUser ? (
            <Link to="/login">
              <li>Log In</li>
            </Link>
          ) : (
            <div className="loggedIn">
              <Link to="/user">
                <li>My Profile</li>
              </Link>
              <li>
                You're logged in as {props.loggedInUser}. Not you?{" "}
                <button className="logoutButton" onClick={props.logOutUser}>
                  Log out
                </button>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
