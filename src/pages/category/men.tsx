import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui'
import { ProductList } from '@/components/products';



const GenderPage = () => {
  const { data, isLoading } = useProducts('products?gender=men');
  return (
    <ShopLayout title='Teslo-Shop - Hombres' pageDescription='Prendas de hombres'>
        <Typography  variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' component='h2' sx={{ mb:1 }}>Todos los productos</Typography>
        {
            isLoading
                ? <FullScreenLoading/>
                : <ProductList products={ data.products } />
        }
    </ShopLayout>
  )
}

export default GenderPage