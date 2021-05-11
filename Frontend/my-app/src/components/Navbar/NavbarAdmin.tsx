import React, { ChangeEvent, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { uploadFile } from '../../services/FileService'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Home,CloudUpload, FaceRounded,SportsEsportsRounded } from "@material-ui/icons";
import { UserContext } from "../../context/user/UserContext";
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tittle: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));
type InputChange = ChangeEvent<HTMLInputElement>;
export const NavbarAdmin = () => {
  const clasStyle = useStyles();
  const { setLogged, setID, setTipo } = useContext(UserContext);
  //const [file, setFile] = useState<InputChange>();
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("TipoID");
    setLogged(false);
    setID(0);
    setTipo(0);
    history.push("/signin");
  };

  const handleUpload = async (e: InputChange) => {
    console.log(e.target.files)
    const readed:FileReader = new FileReader()
    if(e.target.files != null){
      readed.readAsText(e.target.files[0])
      readed.onload = async(e) => {
        const text = e.target?.result
        const data:string = text ? text.toString(): ""
        await uploadFile(data)
      }
      
    }

  }

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
          <input
            accept="*.yaml"
            className={clasStyle.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="contained-button-file">
            <Button variant="text" color="inherit" component="span" startIcon={<CloudUpload />}>
              Upload
            </Button>
          </label>
          <Button component={Link} to="/sport" color="inherit" variant="text" startIcon={<SportsEsportsRounded />}>
            Deporte
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
