import axios from "axios";
import { IEvent, IJournaly, ISeason, ISport } from "../models/Models";
const API = "http://localhost:4000/api";

let sportList:ISport[];
let seasonList:ISeason[];
let journalList:IJournaly[]

export const getSports = async () => {
  return await axios.get<ISport[]>(`${API}/deporte`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSport = (id: number) => {
  const sport: ISport = {
    ID: 0,
    Nombre: "",
    Imagen: "",
    Color: "",
  };
    sportList.forEach((data) => {
      if (data.ID === id) {
        sport.ID = id;
        sport.Nombre = data.Nombre;
        sport.Imagen = data.Imagen;
        sport.Color = data.Color;
        return sport;
      }
    });
  
  return sport;
};
export const getSeasons = async() => {
    return await axios.get<ISeason[]>(`${API}/temporada`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
}

export const getSeason = (id: number):ISeason => {
  const season: ISeason = {
    ID: 0,
    Nombre: "",
    FechaInicio: "",
    FechaFin: "",
    Estado: 0,
  };

    seasonList.forEach((data) => {
      if (data.ID === id) {
        season.ID = data.ID;
        season.Nombre = data.Nombre;
        season.FechaInicio = data.FechaInicio;
        season.FechaFin = data.FechaFin;
        season.Estado = data.Estado;
        return season;
      }
    });
  
  return season;
};
export const getJournalys = async() => {
    return await axios.get<IJournaly[]>(`${API}/jornada`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
}

export const getJournaly =  (id: number):IJournaly => {
  const journal: IJournaly = {
    ID: 0,
    Nombre: "",
    FechaInicio: "",
    FechaFin: "",
    TemporadaID: 0,
    Temporada: "",
  };

    journalList.forEach((data) => {
      if (data.ID === id) {
        journal.ID = data.ID;
        journal.Nombre = data.Nombre;
        journal.FechaInicio = data.FechaInicio;
        journal.FechaInicio = data.FechaFin;
        journal.TemporadaID = data.TemporadaID;
        return journal;
      }
    });
  
  return journal;
};
export const getEvents = async () => {
  return await axios.get<IEvent[]>(`${API}/evento`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  
};

export const getEventById = async (id:string) => {
  const res =  await axios.get<IEvent>(`${API}/evento/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  sportList=(await (getSports())).data
  journalList = (await getJournalys()).data

  const evento:IEvent = {
    ID:res.data.ID,
    Estado:res.data.Estado,
    Fecha:res.data.Fecha,
    EquipoLocal:res.data.EquipoLocal,
    EquipoVisitante:res.data.EquipoVisitante,
    ResultadoLocal:res.data.ResultadoLocal,
    ResultadoVisitante:res.data.ResultadoVisitante,
    DeporteID:res.data.DeporteID,
    JornadaID:res.data.JornadaID,
    TemporadaID:0,
    Deporte:getSport(res.data.DeporteID).Nombre,
    Jornada:getJournaly(res.data.JornadaID).Nombre,
    Temporada:""
  }

  return evento

}

export const getSportByID = async (id:number) => {
  return await axios.get<ISport>(`${API}/deporte/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export const createSport = async(sport:ISport) => {
  return await axios.post<ISport>(`${API}/deporte`, sport, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export const deleteSport = async(id:string) => {
  return await axios.delete<any>(`${API}/deporte/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export const updateSportByID = async(id:string,sport:ISport) => {
  return await axios.put<ISport>(`${API}/deporte/${id}`,sport,{
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getTypeDeport = (name:string):string => {
  switch(name.toLocaleLowerCase()){
      case "basketball":return "https://static.vecteezy.com/system/resources/previews/001/196/882/original/basketball-png.png"
      case "golf":return "https://www.flaticon.es/svg/vstatic/svg/625/625262.svg?token=exp=1620717653~hmac=60d31773ab9598bdffeb1fa5147c0d47"
      case "tennis":return "https://www.flaticon.com/svg/vstatic/svg/625/625322.svg?token=exp=1620717689~hmac=40e5864241781be2dcf0c396e21da2bf"
      case "baseball":return "https://www.flaticon.com/svg/vstatic/svg/3106/3106345.svg?token=exp=1620717744~hmac=cea2dd7be676cea6e18e20eda1fa2bbc"
      case "volleyball":return "https://www.flaticon.com/svg/vstatic/svg/590/590387.svg?token=exp=1620718182~hmac=1bd2251558956474af4a2affaf408a15"
      case "football":return "https://www.flaticon.com/svg/vstatic/svg/27/27127.svg?token=exp=1620717824~hmac=46fb98c4197c6e44cb3c4419db9aa000"
      case "badminton":return "https://www.flaticon.com/svg/vstatic/svg/2965/2965768.svg?token=exp=1620717923~hmac=7f26765caffa63927806fa465988e24a"
      case "ping-pong":return "https://www.flaticon.com/svg/vstatic/svg/1099/1099535.svg?token=exp=1620717958~hmac=211c38c290d2ef0d3e0c3983d7403910"
      default:return "https://image.flaticon.com/icons/png/512/857/857455.png"
  }
}