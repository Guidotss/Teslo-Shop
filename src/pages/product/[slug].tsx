import { NextPage,GetServerSideProps,GetStaticPaths,GetStaticProps } from "next"
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts"
import { dbProducts } from "@/database"
import { ProductSlideShow,SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { IProduct } from "@/interfaces";

interface Props {
  product:IProduct;
}


const ProductPage:NextPage<Props> = ({ product }) => {  

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <ProductSlideShow images={ product.images }/>
            </Grid> 
            <Grid item xs={12} sm={5}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='h1' component='h1'>
                  { product.title }
                </Typography>
                <Typography variant='subtitle1' component='h2'>
                  ${ product.price }
                </Typography>
                <Box sx={{my:2}}>
                  <Typography variant='subtitle2'>
                    <ItemCounter/>
                    <SizeSelector sizes={ product.sizes }/>
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
                    { product.description }
                  </Typography>
                </Box>
              </Box>
            </Grid>
        </Grid>
      </ShopLayout>
  )
}




/* export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { slug } = ctx.query;
  const product = await dbProducts.getProductBySlug( slug as string);
  
  if(!product){
    return {
      redirect:{
        destination:'/404',
        permanent:false
      }
    }
  }

  return {
    props:{
      product
    }
  }
} */


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const data = await dbProducts.getAllProductsSlugs();

  const slugs = data.flatMap(slug => {
    return Object.values(slug);
  });

  return {
    paths: slugs.map( slug => ({ params: { slug } }) ),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { slug } = ctx.params as {slug:string};
  const product = await dbProducts.getProductBySlug( slug );

  return {
    props: {
      product
    }
  }
}

export default ProductPage