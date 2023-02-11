import { NextPage } from "next";
import NextLink from "next/link";
import { ShopLayout } from "@/components/layouts";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage:NextPage = () => {

  return (
    <ShopLayout title='Resumen de la orden 12213231' pageDescription='Resumen de la orden'>
            <Typography variant='h1' component='h1'>Orden: ABC213</Typography>

        {/*     <Chip 
                sx={{my:2}}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined/>}
            /> */}
            <Chip 
                sx={{my:2}}
                label='La orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined/>}
            />
            <Grid container>
                <Grid item xs={ 12 } sm={7}>
                    <CartList/>
                </Grid>
                <Grid item xs={ 12 } sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={{my:1}}/>
                            
                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link sx={{color:'black'}}>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Guido Olguin</Typography>
                            <Typography>321 ABC</Typography>
                            <Typography>Neuquen, 8300</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>+53 214133243</Typography>

                            <Divider sx={{my:1}}/> 

                                <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart'>
                                    <Link sx={{color:'black'}}>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box> 

                            <OrderSummary/>

                            <Box sx={{mt:3}}>
                                {/* TODO */}
                               <h1>Pagar</h1> 

                               <Chip 
                                    sx={{my:2}}
                                    label='La orden ya fue pagada'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined/>}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
  )
}
export default OrderPage;