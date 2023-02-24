export interface AxiosAuthResponse {
    ok:boolean;
    token: string;
    user:{
        email:string;
        name:string;
        role:string;
    }
}