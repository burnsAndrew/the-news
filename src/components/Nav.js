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

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Nav = (props) => {
//   const classes = useStyles();
//   const { loggedInUser, logOutUser } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
//
// export default Nav;