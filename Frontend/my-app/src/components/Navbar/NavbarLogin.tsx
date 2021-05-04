import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tittle: {
    flexGrow: 1,
  },
}));
export const NavbarLogin = () => {
  const clasStyle = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            className={clasStyle.menuButton}
            component={Link}
            to="/"
          >
            <Home />
          </IconButton>
          <Typography variant="h6" className={clasStyle.tittle}>
            QUINIELA
          </Typography>
          <Button component={Link} to="/signin" color="inherit" variant="text">
            Sign In
          </Button>
          <Button component={Link} to="/signup" color="inherit" variant="text">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      {/*<div className={clasStyle.offset}/> */}
    </div>
  );
};
