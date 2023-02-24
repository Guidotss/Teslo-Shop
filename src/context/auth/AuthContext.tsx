import { IUser } from '@/interfaces';
import { createContext } from 'react'; 


interface AuthContextProps {
    isLogged: boolean;
    user?:IUser; 


    login: (emai:string, password:string) => Promise<boolean>;
    register: (name:string, email:string, password:string) => Promise<{hasError:boolean; message?:string}>;
}

export const AuthContext = createContext({} as AuthContextProps); 