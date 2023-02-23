import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { User } from '@/models';
import { signDocument } from '@/utils';
import '@/database/connect';



type Data = 
    |{ message: string; }
    |{ token:string, user:{ name:string, role:string, email:string } }
    

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'POST':
            return loginUser(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});
    }

}



const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email='',password='' } = req.body;

    try{
        
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message: 'Correo o contraseña incorrectos'});
        }

        if(!bcrypt.compareSync(password,user.password!)){
            return res.status(400).json({message: 'Correo o contraseña incorrectos'});
        }

        const { role, name, _id } = user;
        const token = signDocument(_id, email);
        return res.status(200).json({token, user:{ name, role, email }});

        
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }

}
