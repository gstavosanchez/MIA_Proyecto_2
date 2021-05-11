import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import {
  AccountCircle,
  CalendarToday,
  Email,
  Face,
  LockRounded,
  Person,
} from "@material-ui/icons";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../../context/user/UserContext";
import { IUser } from "../../models/User";
import { getLocalUser, getUser } from "../../services/UserService";
import { styles, paperStyle } from "../styles";

type InputChange = ChangeEvent<HTMLInputElement>;
export const MyProfile = () => {
  const { userID, setID } = useContext(UserContext);
  const clasess = styles();
  const initialState = {
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
    Membresia: 0,
  };

  const [user, setUser] = useState<IUser>(initialState);
  const loadUser = async () => {
    if (getLocalUser() !== "") {
      const res = await getUser(getLocalUser());
      const tempUser: IUser = res.data;
      if (tempUser) {
        setID(tempUser.ID);
        const {
          ID,
          UserName,
          Password,
          Nombre,
          Apellido,
          FechaNacimiento,
          FechaRegistro,
          FotoPerfil,
          Email,
          Tipo,
          Membresia,
        } = tempUser;
        setUser({
          ID,
          UserName,
          Password,
          Nombre,
          Apellido,
          FechaNacimiento,
          FechaRegistro,
          FotoPerfil,
          Email,
          Tipo,
          Membresia,
        });
      }
    }
  };
  const handleInputChange = (e: InputChange) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };
  useEffect(() => {
    loadUser();
  }, []);

  const handleDate = (value: string): string => {
    const split1: string[] = value.split("T");
    const split2: string[] = split1[0].split("-");
    const date: string = `${split2[0]}-${split2[1]}-${split2[2]}`;
    return date;
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
              <Avatar
                alt="Remy Sharp"
                src="https://www.flaticon.com/svg/vstatic/svg/2922/2922510.svg?token=exp=1620700917~hmac=5b75d09bfa36aa014c85139df5c4fa66"
                className={clasess.large}
              />
              <h2>Hola:{user.Nombre}</h2>
            </Grid>
            <div>
              <TextField
                label="User Name"
                margin="normal"
                type="text"
                name="UserName"
                onChange={handleInputChange}
                value={user.UserName}
                autoFocus
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <AccountCircle />{" "}
                    </InputAdornment>
                  ),
                }}
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
                value={
                  user.FechaNacimiento !== ""
                    ? handleDate(user.FechaNacimiento)
                    : user.FechaNacimiento
                }
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
              style={{ margin: "8px 0" }}
            >
              Update
            </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};
