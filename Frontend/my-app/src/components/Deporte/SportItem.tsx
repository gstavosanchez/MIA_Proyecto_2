import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import React, { useContext } from "react";
import { SportContext } from "../../context/sport/SportContext";
import { ISport } from "../../models/Models";
import { getTypeDeport,deleteSport } from "../../services/ModelService";
import { styles } from "../styles";
import { toast } from "react-toastify";

interface IProps {
  sport: ISport;
  loadSport: () => void;
}
export const SportItem = ({ sport, loadSport }: IProps) => {
  const clasess = styles();
  const {setSportID,setIsUpdate} = useContext(SportContext) 
  const getLetter = (name: string): string => {
    const letter: string = name.substring(0, 1).toLocaleUpperCase();
    return letter;
  };

  const handleDelete = async(id: number) => {
    console.log(id);
    const res = await deleteSport(id.toString())
    if(res.data){
      if(res.data.Error === "true"){
        console.log(res.data)
        toast.dark("Deleted Succesful")
        loadSport();
      }else{
        toast.error("Deleted Error")
      }
    }

  };
  const handleUpdate = (id: number) => {
    setSportID(id)
    setIsUpdate(false)
  };

/*   useEffect(() => {
    if(sportID !== 0){

    }
  }, []) */

  return (
    <div style={{ padding: 10 }}>
      <Card className={clasess.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={clasess.avatar}>
              {getLetter(sport.Nombre)}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => handleDelete(sport.ID)}
            >
              <DeleteRounded/>
            </IconButton>
          }
          title={`Sport - ${sport.ID}`}
        />
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={getTypeDeport(sport.Nombre)}
          title="Contemplative Reptile"
        />
        <CardActionArea onClick={() => handleUpdate(sport.ID)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Deporte: {sport.Nombre}
            </Typography>
            <Typography paragraph>
              Es una actividad, normalmente de carácter competitivo y que puede
              mejorar la condición física, de quien lo practica, y además tiene
              propiedades que lo diferencian del juego.La mayoría de las
              definiciones de deporte lo definen como "actividad física".
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
