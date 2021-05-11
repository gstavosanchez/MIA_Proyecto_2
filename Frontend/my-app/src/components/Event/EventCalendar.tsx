import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IEvent } from "../../models/Models";
import { getEventById } from "../../services/ModelService";
import { styles } from "../styles";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";

interface IParams {
  id: string;
}
export const EventCalendar = () => {
  const clasess = styles();
  const intialState: IEvent = {
    ID: 0,
    Estado: 0,
    Fecha: "",
    EquipoLocal: "",
    EquipoVisitante: "",
    ResultadoLocal: 0,
    ResultadoVisitante: 0,
    DeporteID: 0,
    JornadaID: 0,
    TemporadaID: 0,
    Deporte: "",
    Jornada: "",
    Temporada: "",
  };
  const params = useParams<IParams>();
  const [event, setEvent] = useState<IEvent>(intialState);

  const getEvent = async (id: string) => {
    const res = await getEventById(id);
    const {
      ID,
      Estado,
      Fecha,
      EquipoLocal,
      EquipoVisitante,
      ResultadoLocal,
      ResultadoVisitante,
      DeporteID,
      JornadaID,
      TemporadaID,
      Deporte,
      Jornada,
      Temporada,
    } = res;
    setEvent({
      ID,
      Estado,
      Fecha,
      EquipoLocal,
      EquipoVisitante,
      ResultadoLocal,
      ResultadoVisitante,
      DeporteID,
      JornadaID,
      TemporadaID,
      Deporte,
      Jornada,
      Temporada,
    });
  };

  useEffect(() => {
    if (params.id) getEvent(params.id);
  }, []);
  return (
    <div className={clasess.content}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card className={clasess.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={clasess.avatar}>
                E
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <SportsBasketballIcon />
              </IconButton>
            }
            title={`Evento - ${event.Jornada}`}
            subheader={event.Fecha}
          />
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://img.icons8.com/ios/452/battle.png"
            title="Contemplative Reptile"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h1">
                {event.EquipoLocal} VS {event.EquipoVisitante}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                Deporte:{event.Deporte}
              </Typography>
              <Typography gutterBottom color="textSecondary" component="p">
                Equipo Local: {event.EquipoLocal}
              </Typography>
              <Typography gutterBottom color="textSecondary" component="p">
                Equipo Visitante: {event.EquipoVisitante}
              </Typography>
              <Typography gutterBottom color="textSecondary" component="p">
                Resultado Local: {event.ResultadoLocal}
              </Typography>
              <Typography gutterBottom color="textSecondary" component="p">
                Resultado Visitante: {event.ResultadoVisitante}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
};
