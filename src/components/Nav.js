import React from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Nav = props => {
  const classes = useStyles();
  const { loggedInUser, logOutUser } = props;
  return (
    <div className="{classes.root}">
      <AppBar position="static" color="black">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/topics"
              style={{ textDecoration: "none", color: "black" }}
            >
              Topics
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/articles"
              style={{ textDecoration: "none", color: "black" }}
            >
              Articles
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/community"
              style={{ textDecoration: "none", color: "black" }}
            >
              Community
            </Link>
          </Typography>
          {!loggedInUser ? (
            <div>
              <Typography variant="h6" className={classes.title}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Log in
                </Link>
              </Typography>
            </div>
          ) : (
            <div className="loggedIn">
              <Typography variant="h6" className={classes.title}>
                <Link
                  to="/user"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {loggedInUser}
                </Link>
              </Typography>

              <Button
                variant="outlined"
                size="small"
                className="logoutButton"
                onClick={logOutUser}
              >
                Log out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
