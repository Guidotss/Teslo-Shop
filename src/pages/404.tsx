import { NextPage } from "next"
import { Box,Typography } from "@mui/material"
import { ShopLayout } from "@/components/layouts"


const Custom404:NextPage = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="No hay nada que mostrar aqui">
        <Box
           display='flex' 
           justifyContent='center' 
           alignItems='center' 
           height='calc(100vh - 200px)'
           sx={{flexDirection: {xs: 'column', sm: 'row'}}}
          >
            <Typography 
              variant='h1' 
              component='h1' 
              fontSize={80} 
              fontWeight={200}
            >
              404 | 
            </Typography>
            <Typography marginLeft={2} variant='h2' component='h2'>
              Page not found
            </Typography>
        </Box>
    </ShopLayout>
  )
}
export default Custom404
