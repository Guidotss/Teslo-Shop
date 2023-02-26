import { useState, useContext } from 'react';
import { NextPage } from "next";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { AuthLayout } from "@/components/layouts";
import { isEmail } from "@/utils";
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
    email: string;
    password: string;
}

const LoginPage:NextPage = () => {

    const [showErrors, setShowErrors] = useState(false)
    const { register, handleSubmit, watch, formState:{ errors } } = useForm<FormData>();
    const { login } = useContext(AuthContext);
    
    
    const router = useRouter();
    const destination = router.query.p?.toString() || '/';

    const onLoginUser = async({email, password}:FormData) => {

        setShowErrors(false);
        
        const isValidLogin = await login(email,password);

        if(!isValidLogin){
            setShowErrors(true);
            setTimeout(() => setShowErrors(false), 3000)
            return;
        }

        router.replace(destination);
    }


  return (
    <AuthLayout title='Login'>
        <form onSubmit={ handleSubmit(onLoginUser) }>
            <Box sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Iniciar Sesión
                        </Typography>
                        <Chip
                            label='Credenciales incorrectas'
                            color='error'
                            icon={<ErrorOutlineOutlined/>}
                            className='fadeIn'
                            sx={{mt:1, display:showErrors ? 'flow' : 'none'}}
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email'
                            label='Email'
                            variant='filled'
                            fullWidth
                            {
                                ...register('email',{
                                    required:'El email es requerido',
                                    validate:isEmail
                                })

                            }
                            error={ !!errors.email ? true : false }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Contraseña'
                            variant='filled'
                            type='password'
                            fullWidth
                            {
                                ...register('password',{
                                    required:'La contraseña es requerida',
                                    minLength:{ value:6, message:'La contraseña debe tener al menos 6 caracteres' }
                                })
                                
                            }
                            error={ !!errors.password ? true : false }
                            helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                            type='submit'
                        >
                            Iniciar Sesión
                        </Button>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                    </Grid>
                        <NextLink href={`/auth/register?p=${destination}`} passHref legacyBehavior>
                            <Link variant='body1' color='secondary' underline='always'>
                                ¿No tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}
export default LoginPage;
