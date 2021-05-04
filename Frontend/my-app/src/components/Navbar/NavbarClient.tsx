import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { UserContext } from "../../context/user/UserContext";
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tittle: {
    flexGrow: 1,
  },
}));
export const NavbarClient = () => {
  const clasStyle = useStyles();
  const { setLogged, setID, setTipo } = useContext(UserContext);
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("userID");
    setLogged(false);
    setID(0);
    setTipo(0);
    history.push("/signin");
  };

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
          <Button component={Link} to="/signup" color="inherit" variant="text">
            Client
          </Button>
          <Button color="inherit" variant="text" onClick={logOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      {/*<div className={clasStyle.offset}/> */}
    </div>
  );
};
