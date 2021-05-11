import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { SportsFootballRounded, OpacityRounded } from "@material-ui/icons";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { SportContext } from "../../context/sport/SportContext";
import { ISport } from "../../models/Models";
import { createSport, getSportByID, getTypeDeport, updateSportByID } from "../../services/ModelService";
import { styles, paperSport } from "../styles";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement>;
interface IProps {
  loadSport: () => void;
}
export const SportForm = ({loadSport}:IProps) => {
  const classes = styles();
  const initialState: ISport = {
    ID: 0,
    Nombre: "",
    Color: "",
    Imagen: "",
  };
  const [sport, setSport] = useState<ISport>(initialState);
  const { sportID,setSportID,setIsUpdate, isUpdate } = useContext(SportContext);
  const handleInputChange = (e: InputChange) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sportID === 0) {
      // Create sport
      console.log(sport);
      await createdSport();
    } else {
      // update sport
      console.log(sport);
      await updatedSport();
    }
  };

  const loadSportItem = async () => {
    const res = await getSportByID(sportID);
    const { ID, Color, Imagen, Nombre } = res.data;
    setSport({ ID, Color, Imagen, Nombre });
    setIsUpdate(true);
  };

  const createdSport = async() => {
    const res = await createSport(sport)
    if (res.data){
      if(res.data.Nombre !== ""){
        console.log("Created Sport")
        toast.dark("Created Sport");
        setSport(initialState);
        loadSport();
      }else{
        toast.error("Name Sport Duplicate")
      }
    }
  }
  const updatedSport = async() => {
    if(sportID !== 0){
      const res = await updateSportByID(sportID.toString(),sport)
      if (res.data){
        if(res.data.Nombre !== ""){
          console.log("Updated Sport")
          toast.dark("Updated Sport");
          setSport(initialState);
          setSportID(0)
          loadSport();
        }else{
          toast.error("Error")
        }
      }
    }
  }
  
  

  useEffect(() => {
    if (sportID !== 0) {
      if (!isUpdate) {
        console.log("Selected:", sportID);
        loadSportItem();
      }
    }
  }, [sportID, isUpdate]);
  return (
    <div style={{ padding: 10 }}>
      <form onSubmit={handleSubmit}>
        <Paper elevation={10} style={paperSport}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Avatar
              alt="Remy Sharp"
              src={getTypeDeport(sport.Nombre).toString()}
              className={classes.large}
            />
            <h2>{sportID === 0 ? "Nuevo" : "Actualizar"} Deporte</h2>
          </Grid>
          <div>
            <TextField
              label="Deporte"
              margin="normal"
              type="text"
              name="Nombre"
              onChange={handleInputChange}
              value={sport.Nombre}
              autoFocus
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <SportsFootballRounded />{" "}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              label="Color"
              margin="normal"
              type="text"
              name="Color"
              onChange={handleInputChange}
              value={sport.Color}
              autoFocus
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <OpacityRounded />{" "}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {sportID === 0 ? (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ margin: "8px 0" }}
            >
              Crear
            </Button>
          ) : (
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              style={{ margin: "8px 0" }}
            >
              Update
            </Button>
          )}
        </Paper>
      </form>
    </div>
  );
};
