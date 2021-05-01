import React, { useReducer } from 'react'
import  UserReducer from './UserReducer'
import { UserContext } from './UserContext'
import { State } from '../typesUser'

export const UserState = (props:any) => {
    const initialState:State = {
        isLogged:false,
        userID:0,
        tipoID:0
    }
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const setLogged = (flag:boolean) =>{
        dispatch({
            type:'SET_LOGGED',
            payload:flag
        })
    }
    const setID = (id:number) => {
        dispatch({
            type:'SET_ID',
            payload:id
        })
    }
    const setTipo = (tipoID:number) => {
        dispatch({
            type:'SET_TIPO',
            payload:tipoID
        })
    }
    
    
    return (
        <UserContext.Provider value={{
            isLogged:state.isLogged,
            userID:state.userID,
            tipoID:state.tipoID,
            setTipo,
            setLogged,
            setID
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
