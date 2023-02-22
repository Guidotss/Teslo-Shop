import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material"

const SearchPage = () => {
    const { data, isLoading } = useProducts('products');

  return (
    <ShopLayout title="Teslo-Shop - Search" pageDescription="Encuentra los mejores productos de Teslo aqui">
        <Typography variant='h1' component='h1'>Buscar producto</Typography>
        <Typography variant='h2' component='h2'>ABC--123</Typography>
        {
            isLoading
                ? <FullScreenLoading/>
                : <ProductList products={data.products} />
        }
    </ShopLayout>
  )
}
export default SearchPage