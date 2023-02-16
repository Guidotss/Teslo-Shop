import { NextPage } from "next"
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";



const Home:NextPage = () => {

  const { data,isLoading } = useProducts('products');

  return (

    <ShopLayout title={"Teslo-Shop - Home"} pageDescription={"Encuentra los mejores productos de Teslo aqui"}>
      <Typography variant='h1'component='h1'>Tienda</Typography>
      <Typography variant='h2'component='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading/>
          : <ProductList products={ data.products }/>
      }

    </ShopLayout>
  )

}

export default Home