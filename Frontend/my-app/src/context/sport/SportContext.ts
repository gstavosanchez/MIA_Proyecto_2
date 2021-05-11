import { createContext } from 'react'
import { ISportContext } from '../typesUser';

const initalState:ISportContext = {
    sportID:0,
    isUpdate:false,
    setSportID:(id:number) => {},
    setIsUpdate:(flag:boolean) => {}
}

export const SportContext = createContext<ISportContext>(initalState)