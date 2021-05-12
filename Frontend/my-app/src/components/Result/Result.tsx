import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { MonetizationOnRounded } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ISeason } from "../../models/Models";
import { ITotalSeson, IUserByTier } from "../../models/Result";
import { getSeasons } from "../../services/ModelService";
import { getTotalSeson, getUserByTier } from "../../services/ResultService";
import { paperResult, styles } from "../styles";

export const Result = () => {
  const clasess = styles();
  const sesonInitial: ITotalSeson = {
    Total: 0,
    Temporada: "",
  };
  const [sesonList, setSesonList] = useState<ISeason[]>([]);
  const [totalSeson, setTotalSeson] = useState<ITotalSeson>(sesonInitial);
  const [userByTierList, setUserByTierList] = useState<IUserByTier[]>([]);
  const loadJournal = async () => {
    const res = await getSeasons();
    if (res.data) {
      setSesonList(res.data);
    }
  };

  const comboBoxChange = async (event: any, newValue: ISeason | null) => {
    if (newValue !== null) {
      await loadResults(newValue.Nombre);
    }
  };

  const loadResults = async (sesonName: string) => {
    const resTotalSesonTemp: ITotalSeson = await getTotalSeson(sesonName);
    const userByTearTemp: IUserByTier[] = await getUserByTier(sesonName);
    setTotalSeson(resTotalSesonTemp);
    setUserByTierList(userByTearTemp);
  };

  const getImage = (seson: string) => {
    if (seson === "gold") {
      return "https://www.flaticon.com/svg/vstatic/svg/138/138287.svg?token=exp=1620795323~hmac=f08373b2e8816e773720758f47c1def9";
    } else if (seson === "silver") {
      return "https://www.flaticon.com/svg/vstatic/svg/134/134592.svg?token=exp=1620795358~hmac=c68223c54591dfa8880843afa6e9af5f";
    } else {
      return "https://www.flaticon.com/svg/vstatic/svg/893/893081.svg?token=exp=1620795662~hmac=0760610398c6645ede9a034aa6b64553";
    }
  };

  useEffect(() => {
    loadJournal();
  }, []);

  return (
    <div className={clasess.content}>
      <Grid container spacing={5}>
        <Paper elevation={10} style={paperResult}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Avatar
              alt="Resultados"
              src="https://www.flaticon.es/svg/vstatic/svg/1589/1589689.svg?token=exp=1620791304~hmac=92c9edde26b35ab5293cd56fb8c22163"
              className={clasess.large}
            />
            <h2>Resultados</h2>
          </Grid>
          <div style={{ paddingTop: 50 }}>
            <Autocomplete
              id="combo-box-demo"
              options={sesonList}
              getOptionLabel={(option) => option.Nombre}
              fullWidth
              onChange={comboBoxChange}
              renderInput={(params) => (
                <TextField {...params} label="Temporada" variant="outlined" />
              )}
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            <TextField
              label="Total"
              type="text"
              margin="normal"
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <MonetizationOnRounded />{" "}
                  </InputAdornment>
                ),
              }}
              name="Total"
              value={
                totalSeson.Total !== 0 ? `Q ${totalSeson.Total}.00` : "Q 0.00"
              }
              variant="outlined"
            />
          </div>
          <div style={{ paddingTop: 20 }}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              {userByTierList.map((data, index) => (
                <Card className={clasess.card} key={index}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={getImage(data.Membresia)}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h1">
                      Tipo: <strong>{data.Membresia}</strong>
                    </Typography>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      Numero Usuarios: <strong>{data.NoUsers}</strong>
                    </Typography>
                    <Typography
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      Temporada: <strong>{data.Temporada}</strong>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};
