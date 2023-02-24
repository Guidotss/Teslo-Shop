import type { NextApiRequest, NextApiResponse } from 'next'
import '@/database/connect';
import { signDocument, verifyToken } from '@/utils';
import { User } from '@/models';


type Data = 
    |{ message: string }
    |{ token:string, user:{ name:string, role:string, email:string } }
    

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return validateToken(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});
    }
}
const validateToken = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token='' } = req.cookies;
    let userId = '';

    try{

        userId = await verifyToken(token);
        const user = await User.findById(userId).lean();

        if(!user){
            return res.status(401).json({message: 'No existe un usuario con ese ID'});
        }

        const { email,role,name } = user;

        return res.status(200).json({
            token:signDocument(userId,email),
            user:{
                name,
                email,
                role
            }
        });

    }catch(err){
        return res.status(401).json({message: 'Invalid token'});
    }

  

}

