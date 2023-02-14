import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/models';
import { IProduct } from '@/interfaces';
import '@/database/connect';


type Data = 
    | {message: string}
    | {products: IProduct[] | null}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method){
        case 'GET':
            return searchProducts(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});
        
    }
    
}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q='' } = req.query;

    if(q.length === 0){
        return res.status(400).json({message: 'Search query is required'});
    }

    try{
        
       const products = await Product.find({
            $text: {
                $search: q as string 
            }
       })
       .select('')

       if(products.length === 0){
           return res.status(404).json({message: 'No products found'});
       }

         return res.status(200).json({products});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
