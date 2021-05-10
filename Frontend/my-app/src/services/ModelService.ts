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
