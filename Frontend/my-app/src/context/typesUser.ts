export type userActionType = { type: "SET_LOGGED",payload:boolean }
                            | { type: "IS_LOGING"} 
                            | { type: "SET_ID",payload:number }
                            | { type: "GET_ID"}
                            | { type: "SET_TIPO",payload:number } 
                            | { type: "GET_TIPO" }

export type State = {
    isLogged:boolean
    userID:number
    tipoID:number
}

export interface IUserContext {
    isLogged:boolean;
    userID:number;
    tipoID:number;
    setTipo (id:number):void
    setLogged (flag:boolean):void
    setID(id:number):void 
}