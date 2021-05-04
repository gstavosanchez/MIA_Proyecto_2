import axios from "axios";
import { ILogin } from "../models/Login";
import { IUser } from "../models/User";
const API = "http://localhost:4000/api";

export const signIn = async (userLogin: ILogin) => {
  return await axios.post<IUser[]>(`${API}/signin`, userLogin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const signUp = async (user: IUser) => {
  return await axios.post<IUser>(`${API}/signup`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
