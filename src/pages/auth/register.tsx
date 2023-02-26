import { useState, useContext } from 'react';
import { NextPage } from "next"
import NextLink from "next/link";
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { AuthContext } from '@/context';
import { AuthLayout } from "@/components/layouts";
import { isEmail } from '@/utils';
import { tesloApi } from "@/api";
import { useRouter } from 'next/router';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage:NextPage = () => {

    const router = useRouter();
    const destination = router.query.p?.toString() || '/';

    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const { register, handleSubmit, watch, formState:{ errors } } = useForm<FormData>();
    const { register:registerUser }  = useContext(AuthContext);

    const onRegister = async({name, email, password}:FormData) => {
        
        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        try{
            if(hasError){
                setShowError(true);
                setErrorMessage(message!);
                setTimeout(() => setShowError(false), 3000);
                return;
            }
            
            router.replace(destination);
            
        }catch(err){
            setShowError(true);
            console.log(err);
            setTimeout(() => setShowError(false), 3000);
        }

    }

  return (
    <AuthLayout title='Register'>
        <form onSubmit={handleSubmit(onRegister)}>

            <Box sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Crear cuenta
                        </Typography>
                        <Chip
                            label='Error al crear la cuenta'
                            color='error'
                            icon={<ErrorOutlineOutlined/>}
                            sx={{mt:1, display:showError ? 'flow' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Nombre'
                            variant='filled'
                            fullWidth
                            {
                                ...register('name', {
                                    required: 'El nombre es obligatorio',
                                    minLength: {
                                        value: 3,
                                        message: 'El nombre debe tener al menos 3 caracteres'
                                    }
                                })
                            }
                            error={!!errors.name ? true : false}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Email'
                            variant='filled'
                            fullWidth
                            {
                                ...register('email', {
                                    required: 'El email es obligatorio',
                                    validate:isEmail
                                })
                            }
                            error={!!errors.email ? true : false}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Contraseña'
                            variant='filled'
                            fullWidth
                            type='password'
                            {
                                ...register('password', {
                                    required: 'La contraseña es obligatoria',
                                    minLength: {
                                        value: 6,
                                        message: 'La contraseña debe tener al menos 6 caracteres'
                                    }
                                })
                            }
                            error={!!errors.password ? true : false}
                            helperText={errors.password?.message}
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
                            Registrate
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href={`/auth/login?p=${destination}`} passHref legacyBehavior>
                            <Link variant='body1' color='secondary' underline='always'>
                                ¿Ya tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid> 
            </Box>  
        </form>

    </AuthLayout>
  )
}
export default RegisterPage;