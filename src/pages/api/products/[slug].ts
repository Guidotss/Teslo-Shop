import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/models';
import { IProduct } from '@/interfaces';
import '@/database/connect';

type Data = 
    |{message: string}
    |{product:IProduct | null}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getProductBySlug(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});

    }
}   
const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query;

    try{
        const product = await Product.findOne({ slug }).lean();
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }

        return res.status(200).json({product});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
    
}

