import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { SHOP_CONSTANTS } from '@/database';
import '@/database/connect';


type Data = 
    |{message: string;}
    |{ products: IProduct[]}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET': 
            return getProducts(req, res);
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}   


const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender='all' } = req.query;
    let condition = {};
    console.log(gender)

    if(gender !== 'all' && SHOP_CONSTANTS.validateGenders.includes(`${ gender }`)){
        condition={ gender }
    }

    try{
        const products = await Product.find(condition)
                                      .select('title price slug images inStock -_id')
                                      .lean()
        return res.status(200).json( { products } )

    }catch(err){
        console.log(err); 
        return res.status(500).json({ message: 'Internal server error' })
    }
}
