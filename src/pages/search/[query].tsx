
import { GetServerSideProps, NextPage  } from 'next';
import { Box, capitalize, Typography } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';
import { ShopLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '../../components/products/ProductList';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';



interface Props {
  products:IProduct[];
  foundProducts:boolean;
  query:string
}

const SearchPage:NextPage<Props> = ({ products,foundProducts,query }) => {

  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Encuentra los mejores productos de Teslo aqui' >

        <Typography variant='h1' component='h1'>Buscar producto</Typography>

        {
          foundProducts
            ? <Typography variant='h2' component='h2' >{ products.length } productos encontrados</Typography>
            : (
              <Box display='flex'>
                <Typography variant='h2' component='h2'>No se encontraron productos con el termino:</Typography>
                <Typography variant='h2' component='h2' color='secondary' sx={{ml:1,textDecoration:'underline', mb:1}}>{ capitalize(query) }</Typography>
              </Box>
            )
        }

        <ProductList products={ products }/>   
    </ShopLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { query='' } = ctx.params as { query:string };

  if(query.length === 0){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  let products = await dbProducts.getProductByQuery(query);
  const foundProducts = products.length > 0;

  if(!foundProducts){
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}


export default SearchPage       