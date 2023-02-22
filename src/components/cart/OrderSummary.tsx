import { FC, useContext } from 'react';
import { Grid, Typography } from "@mui/material"
import { CartContext } from '@/context/cart';
import { currency } from '@/utils';



export const OrderSummary:FC= () => {

    const { orderSummary } = useContext(CartContext);
    const { numberOfItems, subTotal, tax, taxRate,total } = orderSummary;
    

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>
                No. Productos
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
                {numberOfItems} {numberOfItems === 1 ? 'Producto' : 'Productos'}
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex'>
            <Typography>
                Subtotal
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
              {currency.format(subTotal)}
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex'>
            <Typography>
                Impuestos ({taxRate * 100}%)
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
                {currency.format(tax)}
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}} display='flex'>
            <Typography variant='subtitle1' component='strong'>
                Total:
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
            <Typography variant='subtitle1' component='strong'>
                {currency.format(total)}
            </Typography>
        </Grid>
        
    </Grid>
  )
}