import { NextPage } from "next"
import { useRouter } from "next/router";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts"
import { useProducts } from '@/hooks';
import { ProductSlideShow,SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";

const ProductPage:NextPage = () => {

  const { query } = useRouter();
  const { data, isLoading } = useProducts(`/products/${ query.slug }`);
  
  
  if(isLoading){
    return <h1>Cargando...</h1>
  }
  
  if(!data){
    return <h1>No hay datos</h1>
  }



  return (
    <ShopLayout title={data.product.title} pageDescription={data.product.description}>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <ProductSlideShow images={data.product.images}/>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h1' component='h1'>
                {data.product.title}
              </Typography>
              <Typography variant='subtitle1' component='h2'>
                ${data.product.price}
              </Typography>
              <Box sx={{my:2}}>
                <Typography variant='subtitle2'>
                  <ItemCounter/>
                  <SizeSelector sizes={data.product.sizes}/>
                </Typography>
              </Box>
              <Button color='secondary' className='circular-btn'>
                Agregar al carrito
              </Button>
              {/* <Chip label='No hay disponible' variant='outlined' color='error'/> */}

              <Box sx={{mt:3}}>
                <Typography variant='subtitle2'>
                  Descripción
                </Typography>
                <Typography variant='body2'>
                  {data.product.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
      </Grid>
    </ShopLayout>
  )
}
export default ProductPage