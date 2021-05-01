import { createContext } from 'react'
import { IUserContext } from '../typesUser';

export const UserContext = createContext<IUserContext>({
    isLogged:false,
    userID:0,
    tipoID:0,
    setTipo:() =>{},
    setLogged:() =>{},
    setID:() =>{}
});