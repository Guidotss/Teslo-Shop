import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";


const SummaryPage:NextPage = () => {
  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

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
                                <NextLink href='/checkout/address'>
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
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
  )
}
export default SummaryPage;