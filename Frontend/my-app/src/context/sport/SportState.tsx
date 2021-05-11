import React, { useReducer } from 'react'
import { sportState } from '../typesUser'
import { SportContext } from './SportContext'
import SportReducer from './SportReducer'

export const SportState = (props:any) => {
    const initialState:sportState = {
        sportID:0,
        isUpdate:false
    }
    const [state, dispatch] = useReducer(SportReducer, initialState)
    const setSportID = (id:number) => {
        dispatch({
            type:'SET_ID',
            payload:id
        })
    }
    const setIsUpdate = (flag:boolean) => {
        dispatch({
            type:'SET_FLAG',
            payload:flag
        })
    }
    
    
    return (
        <SportContext.Provider value={{
            sportID:state.sportID,
            isUpdate:state.isUpdate,
            setSportID,
            setIsUpdate
        }}>
            {props.children}
        </SportContext.Provider>
    )
}
