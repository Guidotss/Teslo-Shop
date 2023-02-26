import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import { AxiosAuthResponse } from '../../interfaces/axiosAuthResponse';

interface AuthProviderProps {
    children: React.ReactNode;
}

export interface IAuthState {
    isLogged: boolean;
    user?:IUser;
}

const AUTH_INITIAL_STATE:IAuthState = {
    isLogged: false,
    user:undefined
}

export const AuthProvider:FC<AuthProviderProps> = ({ children }) => {
    const [ state,dispathc ] = useReducer(authReducer,AUTH_INITIAL_STATE);
    const router = useRouter();



    useEffect(() => {
        revalidateToken();
    },[]);


    const revalidateToken = async() => {
        
        const token = Cookies.get('token');
        if(!token){
            dispathc({
                type:'[AUTH] - Logout'
            });
            return;
        }

        try{

            const { data } = await tesloApi.get<AxiosAuthResponse>('/auth/validate-token');
            if(data.ok){
                const { token, user } = data;
                Cookies.set('token',token);
                dispathc({
                    type: '[AUTH] - Login',
                    payload:user
                });
            }
            
        }catch(err){
            console.log(err);
            dispathc({
                type:'[AUTH] - Logout'
            }); 
        }
        
    }


    useEffect(() => {
        checkToken();
    },[]);


    const checkToken = async() => {
        try{

            const token = Cookies.get('token');

            if(!token){
                return dispathc({
                    type: '[AUTH] - Logout'
                })
            }

            const { data } = await tesloApi.get<AxiosAuthResponse>('/auth/validate-token');
            
            if(data.ok){
                dispathc({
                    type: '[AUTH] - Login',
                    payload:data.user
                })
                Cookies.set('token',data.token);
            }

        }catch(err){
            console.log(err);
            dispathc({
                type: '[AUTH] - Logout'
            });
            Cookies.remove('token');
        }

    }

    const login = async(email:string, password:string):Promise<boolean> => {
        try{

            const { data } = await tesloApi.post<AxiosAuthResponse>('/auth/login',{ email,password });
            if(data.ok){
                const { token,user } = data;
                Cookies.set('token',token); 
                dispathc({
                    type: '[AUTH] - Login',
                    payload:user
                })
            }
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    const register = async(name:string, email:string, password:string):Promise<{hasError:boolean; message?:string}> => {

        try{

            const { data } = await tesloApi.post<AxiosAuthResponse>('/auth/register',{ name,email,password });
            if(data.ok){
                const { token,user } = data;
                Cookies.set('token',token);
                dispathc({
                    type: '[AUTH] - Login',
                    payload:user
                })
            }
            return {
                hasError:false,
                message:'Usuario registrado correctamente'
            }

        }catch(err){
            
            if(axios.isAxiosError(err)){
                return {
                    hasError:true,
                    message:err.response?.data.message
                }
            }
            return {
                hasError:true,
                message:'No se pudo registrar el usuario - intentelo mas tarde'
            }
        }



    }
    
    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        router.reload();
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

            //Methods
                login,
                register,
                logout,
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}