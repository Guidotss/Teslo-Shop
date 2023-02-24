import { IAuthState } from './AuthProvider';
import { IUser } from '@/interfaces';



type AuthActionType = 
    |{ type:'[AUTH] - Login', payload:IUser}
    |{ type:'[AUTH] - Logout' }



export const authReducer = (state:IAuthState, action:AuthActionType) => {
    switch(action.type){
        case '[AUTH] - Login':
            return {
                ...state,
                isLogged:true,
                user:action.payload
            }
        case '[AUTH] - Logout':
            return {
                ...state,
                isLogged:false,
                user:undefined
            }
        default:
            return state;
    }
}