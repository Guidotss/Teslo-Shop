import { NextPage } from "next"
import NextLink from "next/link";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "@/components/layouts";
const RegisterPage:NextPage = () => {
  return (
    <AuthLayout title='Register'>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>
                        Crear cuenta
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Nombre'
                        variant='filled'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Email'
                        variant='filled'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Contraseña'
                        variant='filled'
                        fullWidth
                        type='password'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color='secondary'
                        className='circular-btn'
                        size='large'
                        fullWidth
                    >
                        Registrate
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref legacyBehavior>
                        <Link variant='body1' color='secondary' underline='always'>
                            ¿Ya tienes una cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
             

        </Box>
    </AuthLayout>
  )
}
export default RegisterPage;