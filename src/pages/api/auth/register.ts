import type { NextApiRequest, NextApiResponse } from 'next'
import '@/database/connect';
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { signDocument, isValidEmail } from '@/utils';


type Data = 
    |{ message: string }
    |{ token:string, user:{ name:string, role:string, email:string } }


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'POST':
            return registerUser(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email,password,name } = req.body as {email:string,password:string,name:string};

    try{

        const user = await User.findOne({email});
            
        if(password.length < 6){
            return res.status(400).json({message: 'La contraseña debe tener al menos 6 caracteres'});
        }
        if(name.length < 3){
            return res.status(400).json({message: 'El nombre debe tener al menos 3 caracteres'});
        }
        if(!isValidEmail(email)){
            return res.status(400).json({message: 'El email no es válido'});
        }

        if(user){
            return res.status(400).json({message: 'El usuario ya existe'});
        }

        const newUser = new User({
            email: email.toLowerCase(),
            password: bcrypt.hashSync(password),
            role:'client',
            name
        });
        await newUser.save({validateBeforeSave:true});


        const { _id,role } = newUser;
        const token = signDocument(_id, email);

        return res.status(200).json({
            token,
            user:{
                name,
                role,
                email
            }
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}