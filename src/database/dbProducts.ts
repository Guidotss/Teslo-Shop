
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


export const getProductByQuery = async( query:string ):Promise<IProduct[]> => {
    
    query = query.toString().toLowerCase();

    try{
        const products = await Product.find({
            $text: {$search: query}
        })
        .select('inStock title slug price images -_id')
        .lean();

        return products;

    }catch(err){
        console.log(err)
        throw new Error('Error al obtener los productos por query');
    }


}


export const getAllProducts = async():Promise<IProduct[]> => {
    try{
        const products = await Product.find().select('inStock title slug price images -_id').lean();
        return products;

    }catch(err){
        console.log(err)
        throw new Error('Error al obtener los productos')
    }
}