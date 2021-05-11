import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home,FaceRounded,StorefrontTwoTone } from "@material-ui/icons";
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
    localStorage.removeItem("TipoID");
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
            to="/dashboard"
          >
            <Home />
          </IconButton>
          <Typography variant="h6" className={clasStyle.tittle}>
            QUINIELA
          </Typography>
          <Button component={Link} to="/buy-member" color="inherit" variant="text" startIcon={<StorefrontTwoTone />}>
            Tienda
          </Button>
          <Button component={Link} to="/profile" color="inherit" variant="text" startIcon={<FaceRounded />}>
            Mi Perfil
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
