import axios from "axios";
import { IMembresia } from "../models/Membresia";
const API = "http://localhost:4000/api";

export const getMembers = async () => {
  return await axios.get<IMembresia[]>(`${API}/membresia`,{
    headers: {
      "Content-Type": "application/json",
    },
  });
};
