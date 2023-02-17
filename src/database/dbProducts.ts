
import { Product } from "@/models"
import { IProduct } from "@/interfaces";
import './connect';

export const getProductBySlug = async (slug: string):Promise<IProduct | null> => {
    try{
        const product = await Product.findOne({slug});

        if(!product){
            return null;
        }
        return JSON.parse(JSON.stringify(product));

    }catch(err){
        console.log(err);
        throw new Error(`Error al obtener el producto con slug: ${slug}`);
    }

}

interface ProductSlugs {
    slug: string;
}

export const getAllProductsSlugs = async():Promise<ProductSlugs[]> => {
    try{

        const slugs = await Product.find().select('slug -_id').lean();
        return slugs;

    }catch(err){
        console.log(err)
        throw new Error('Error al obtener los slugs de los productos');
    }
}