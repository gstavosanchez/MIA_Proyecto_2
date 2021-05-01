import { State,userActionType } from '../typesUser'

export default (state:State,action:userActionType) =>{
   
    switch(action.type){
        case  'IS_LOGING':
            return{
                ...state,
                isLogged:state.isLogged
            }
        case 'SET_LOGGED':
            return{
                ...state,
                isLogged:action.payload
            }
        case 'SET_ID':
            return{
                ...state,
                userID:action.payload
            }
        case 'GET_ID':
            return{
                ...state,
                userID:state.userID
            }
        case 'SET_TIPO':
            return{
                ...state,
                tipoID:action.payload
            }
        case 'GET_TIPO':
            return{
                ...state,
                tipoID:state.tipoID
            }
        default:
            return state;
    }
}