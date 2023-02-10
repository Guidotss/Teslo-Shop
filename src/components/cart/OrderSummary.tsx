import { Grid, Typography } from "@mui/material"
import { FC } from "react"



export const OrderSummary:FC= () => {

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>
                No. Productos
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
                3 items
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex'>
            <Typography>
                Subtotal
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
                ${`155.36`}
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex'>
            <Typography>
                Impuestos (15%)
            </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>
                ${`23.31`}
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}} display='flex'>
            <Typography variant='subtitle1' component='strong'>
                Total:
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
            <Typography variant='subtitle1' component='strong'>
                ${`178.67`}
            </Typography>
        </Grid>
        
    </Grid>
  )
}