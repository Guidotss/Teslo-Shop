import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from "@/models";
import { seedDataBase } from '@/database';
import '@/database/connect';

interface Data {
    message: string;
}



export default async function handler(_req:NextApiRequest, res:NextApiResponse){
    if(process.env.NODE_ENV === 'production') return res.status(403).json({
        message: 'Forbidden'
    })

    try{

        await Product.deleteMany({});
        await Product.insertMany(seedDataBase.initialData.products);

        return res.status(200).json({
            message: 'Success'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}