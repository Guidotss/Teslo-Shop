import { ShopLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui';
import { Typography } from '@mui/material';
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks/useProducts';


const WomenPage = () => {

    const { data,isLoading } = useProducts('products?gender=women');


  return (
    <ShopLayout title=' Teslo-Shop - Mujeres' pageDescription='Prendas de mujeres'>
        <Typography  variant='h1' component='h1'>Mujeres</Typography>
        <Typography variant='h2' component='h2' sx={{ mb:1 }}>Todos los productos</Typography>
        {
            isLoading
                ? <FullScreenLoading/>
                : <ProductList products={ data.products } />
        }
    </ShopLayout>
  )
}
export default WomenPage