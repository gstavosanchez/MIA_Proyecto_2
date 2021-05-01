import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined, AccountCircle, LockRounded } from "@material-ui/icons";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ILogin } from "../../models/Login";
import { IUser } from "../../models/User";
import * as userService from "../../services/UserService";
import { UserContext } from "../../context/user/UserContext";


const styles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
type InputChange = ChangeEvent<HTMLInputElement>;
export const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vH",
    width: 400,
    margin: "20px auto",
  };
  const initialState: ILogin = {
    UserName: "",
    Password: "",
  };
  const {isLogged,setLogged,setID,setTipo} = useContext(UserContext) 
  const avatarStyle = { backgroundColor: "#0C0A0E" };
  const bttnStyle = { margin: "8px 0" };
  const clasess = styles();
  const history = useHistory();
  const [user, setUser] = useState<ILogin>(initialState);
  useEffect(() => {
    if(isLogged){
      history.push('/dashboard')
    }
  }, [isLogged,history])
  const handleInputChange = (e: InputChange) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await userService.signIn(user);
    if (res.data) {
      const users: IUser[] = res.data;
      if (users.length === 1) {
        if(users[0].ID === undefined) return
        localStorage.setItem('userID',users[0].ID.toString())
        setTipo(users[0].Tipo)
        setLogged(true)
        setID(users[0].ID)
        setUser(initialState);
        toast.success("Login Succes");
      } else {
        toast.error("User o Password invalid");
        setUser(initialState);
      }
    }
  };
  return (
    <div className={clasess.content}>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar style={avatarStyle}>
                <LockOutlined />
              </Avatar>
              <h1>Sing In</h1>
            </Grid>
            <br />
            <br />
            <br />
            <TextField
              label="UserName"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <AccountCircle />{" "}
                  </InputAdornment>
                ),
              }}
              name="UserName"
              onChange={handleInputChange}
              value={user.UserName}
              autoFocus
              fullWidth
              required
            />
            <br />
            <br />
            <br />
            <TextField
              label="Password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <LockRounded />{" "}
                  </InputAdornment>
                ),
              }}
              name="Password"
              onChange={handleInputChange}
              value={user.Password}
              fullWidth
              required
            />
            <br />
            <br />
            <br />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              style={bttnStyle}
            >
              Sign In
            </Button>
            <Typography>
              
              Recupear Password
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};
