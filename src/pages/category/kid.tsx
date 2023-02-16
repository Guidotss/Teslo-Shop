import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";

const KidPage = () => {
    const { data,isLoading } = useProducts('products?gender=kid');

    return (
      <ShopLayout title='Teslo-Shop - Niños' pageDescription='Prendas de niños'>
          <Typography  variant='h1' component='h1'>Niños</Typography>
          <Typography variant='h2' component='h2' sx={{ mb:1 }}>Todos los productos</Typography>
          {
              isLoading
                  ? <FullScreenLoading/>
                  : <ProductList products={ data.products } />
          }
      </ShopLayout>
    )
}
export default KidPage