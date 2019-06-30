import React from "react";
import { Link } from "@reach/router";
import Button from "@material-ui/core/Button";

const Nav = props => {
  const { loggedInUser, logOutUser } = props;
  return (
    <nav>
      <ul className="nav">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/topics">
          <li>Topics</li>
        </Link>
        <Link to="/articles">
          <li>Articles</li>
        </Link>
        <Link to="/community">
          <li>Community</li>
        </Link>
        {!loggedInUser ? (
          <div>
            <Link to="/login">
              <li>Log in</li>
            </Link>
          </div>
        ) : (
          <div className="loggedIn">
            <Link to="/user">
              <li>My Profile</li>
            </Link>
            <li>
              You're logged in as {loggedInUser}. Not you?{" "}
              <Button
                variant="outlined"
                size="small"
                className="logoutButton"
                onClick={logOutUser}
              >
                Log out
              </Button>
              {/* <Link to="/createaccount">
              <li>Create account</li>
            </Link> */}
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
