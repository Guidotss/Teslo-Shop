import { useContext,useState } from 'react';
import { NextPage,GetStaticPaths,GetStaticProps } from "next"
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "@/components/layouts"
import { dbProducts } from "@/database"
import { ProductSlideShow,SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { IProduct,ICartProduct,ISize } from "@/interfaces";
import { CartContext } from '@/context';



interface Props {
  product:IProduct;
}


const ProductPage:NextPage<Props> = ({ product }) => {
  
  const { addProduct } = useContext( CartContext );

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id:product._id,
    images:product.images[0],
    price:product.price,
    size:'XL',
    slug:product.slug,
    title:product.title,
    gender:product.gender,
    quantity:1
  });

  const selectedSize = ( size:ISize ) => {
    setTempCartProduct({
      ...tempCartProduct,
      size
    });
  }

  const UpdateQuantity = (quantity:number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }


  const addCartProduct = () => {

    if( !tempCartProduct.size ) return;
    addProduct( tempCartProduct );

  }


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
                    <ItemCounter 
                      currentValue={ tempCartProduct.quantity }
                      updateQuantity={ UpdateQuantity }
                      maxValue={ product.inStock > 10 ? 10 : product.inStock }
                    />
                    <SizeSelector 
                      sizes={ product.sizes }
                      selectedSize={ tempCartProduct.size }
                      onSelectedSize={ selectedSize }
                    />
                  </Typography>
                </Box>

                
                {
                  (product.inStock > 0)
                    ?(
                      <Button color='secondary' className='circular-btn' onClick={ addCartProduct }>
                        {
                          tempCartProduct.size
                            ? 'Agregar al carrito'
                            : 'Selecciona un talle'
                        }
                      </Button>
                    )
                    :(
                      <Chip 
                        label='Agotado' 
                        variant="outlined"
                        color='error'/>
                    )
                }

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


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const data = await dbProducts.getAllProductsSlugs();

  const slugs = data.flatMap(slug => {
    return Object.values(slug);
  });

  return {
    paths: slugs.map( slug => ({ params: { slug } }) ),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { slug } = ctx.params as {slug:string};
  const product = await dbProducts.getProductBySlug( slug );

  if(!product){
    return {
      redirect:{
        destination:'/404',
        permanent:false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage