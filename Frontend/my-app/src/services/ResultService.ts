import axios from 'axios'
import { ITotalSeson, IUserByTier } from '../models/Result';

const API = "http://localhost:4000/api";

export const getTotalSesonsList = async() => {
    return await axios.get<ITotalSeson[]>(`${API}/totaltemporada`, {
        headers: {
            "Content-Type": "application/json",
        },
        });
}
export const getUserByTiersList = async() => {
    return await axios.get<IUserByTier[]>(`${API}/usuariosmembresia`, {
        headers: {
            "Content-Type": "application/json",
        },
        });
}

export const getTotalSeson = async(nameSeson:string) => {
    const list:ITotalSeson[] = (await getTotalSesonsList()).data
    const seson:ITotalSeson ={
        Total:0,
        Temporada:""
    }
    list.forEach(element => {
        if(element.Temporada === nameSeson){
            seson.Total = element.Total
            seson.Temporada = element.Temporada
            return seson
        }
    });
    return seson
}
export const getUserByTier = async(sesonName:string) => {
    const list:IUserByTier[] = (await getUserByTiersList()).data
    const tempList:IUserByTier[] = []
    const tier:IUserByTier = {
        NoUsers:0,
        Temporada:"",
        Membresia:""
    }
    for (let index = 0; index < list.length; index++) {
        const data = list[index];
        if (data.Temporada === sesonName){
            tempList.push(data)
        }
        
    }    
    return tempList
}
