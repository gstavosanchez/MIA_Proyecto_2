import React, { ChangeEvent, FormEvent, useState } from "react";
import { IUser } from "../../models/User";
//import * as moment from 'moment'
// Material UI
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import {
  Add,
  AccountCircle,
  LockRounded,
  Face,
  Person,
  CalendarToday,
  Email
} from "@material-ui/icons";

const styles = makeStyles((theme:Theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
type InputChange = ChangeEvent<HTMLInputElement>;
export const SignUp = () => {
  const clasess = styles();
  const bttnStyle = { margin: "8px 0" };
  const initialState: IUser = {
    ID: 0,
    UserName: "",
    Password: "",
    Nombre: "",
    Apellido: "",
    FechaNacimiento: "",
    FechaRegistro: "",
    FotoPerfil: "",
    Email: "",
    Tipo: 1,
    Membresia: 4,
  };
  const paperStyle = {
    padding: 20,
    height: "70vH",
    width: 400,
    margin: "20px auto",
  };
  const [user, setUser] = useState<IUser>(initialState);
  const handleInputChange = (e:InputChange) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.FechaNacimiento !== ""){
      const dateSplit:string[] = user.FechaNacimiento.split("-")
      const newDate:string = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
      user.FechaNacimiento = newDate;
      /*      setUser({
        ...user,
        UserName:'hola mundo'
      })  */
    }
    console.log(user)
  }
  
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
            <Avatar style={{ backgroundColor: "#0C0A0E" }}>
              <Add fontSize="large" />
            </Avatar>
            <h2>Register</h2>
          </Grid>
          <div>
            <TextField
              label="User Name"
              margin="normal"
              fullWidth
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
              required
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              fullWidth
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
              required
            />
            <TextField
              label="Name"
              type="text"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <Face />{" "}
                  </InputAdornment>
                ),
              }}
              name="Nombre"
              onChange={handleInputChange}
              value={user.Nombre}
              required
            />
            <TextField
              label="Last Name"
              type="text"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <Person />{" "}
                  </InputAdornment>
                ),
              }}
              name="Apellido"
              onChange={handleInputChange}
              value={user.Apellido}
              required
            />
            <TextField
              label="Birthday"
              type="date"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <CalendarToday />{" "}
                  </InputAdornment>
                ),
              }}
              name="FechaNacimiento"
              onChange={handleInputChange}
              value={user.FechaNacimiento}
              required
            />
            <TextField
              label="Email"
              type="email"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <Email />{" "}
                  </InputAdornment>
                ),
              }}
              name="Email"
              onChange={handleInputChange}
              value={user.Email}
              required
            />
          </div>
          <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              style={bttnStyle}
            >
              Register
            </Button>
        </Paper>
      </Grid>
      </form>
    </div>
  );
};
