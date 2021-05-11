import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { SportState } from "../../context/sport/SportState";
import { ISport } from "../../models/Models";
import { getSports } from "../../services/ModelService";
import { styles } from "../styles";
import { SportForm } from "./SportForm";
import { SportItem } from "./SportItem";
export const SportList = () => {
  const [deporte, setDeporte] = useState<ISport[]>([]);
  const clasess = styles();
  const loadSport = async () => {
    const res = await getSports();
    const sportList: ISport[] = res.data;
    setDeporte(sportList);
  };

  useEffect(() => {
    loadSport();
  }, []);
  return (
    <div className={clasess.contentCard}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <SportState>
          <SportForm loadSport={loadSport} />
          {deporte.map((sport) => (
            <SportItem sport={sport} loadSport={loadSport} key={sport.ID} />
          ))}
        </SportState>
      </Grid>
    </div>
  );
};
