import jwt from 'jsonwebtoken';


export const signDocument = (_id:string,email:string) => {
    
    if(!process.env.JWT_SECRET_SEED) throw new Error('No hay semilla de JWT - revisar .env')
    
    return jwt.sign({_id, email},process.env.JWT_SECRET_SEED,{expiresIn:'1h'});

}

export const verifyToken = (token:string):Promise<string> => {

    if(!process.env.JWT_SECRET_SEED) throw new Error('No hay semilla de JWT - revisar .env');

    if(token.length < 10){
        return Promise.reject('No se pudo verificar el token');
    }

    return new Promise((resolve,reject) => {
        try{
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err,payload) => {
                if(err){
                    reject('No se pudo verificar el token');
                }
                const { _id } = payload as { _id:string };
                resolve(_id);
            });
        }catch(err){
            reject('No se pudo verificar el token');
        }
    })
}