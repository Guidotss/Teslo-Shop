import jwt from 'jsonwebtoken';


export const signDocument = (_id:string,email:string) => {
    
    if(!process.env.JWT_SECRET_SEED) throw new Error('No hay semilla de JWT - revisar .env')
    
    return jwt.sign({_id, email},process.env.JWT_SECRET_SEED,{expiresIn:'1h'});

}