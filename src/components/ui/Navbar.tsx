import { FC, useContext, useState } from 'react';
import NextLink from "next/link"; 
import { useRouter } from "next/router";

import { AppBar,Toolbar,Link, Typography, Box, Button, IconButton,Badge, Input, InputAdornment  } from "@mui/material";
import { ClearOutlined, SearchOffOutlined,SearchOutlined,ShoppingCartOutlined } from "@mui/icons-material";
import { UiContext } from "@/context";
import { CartContext } from '../../context/cart/CartContext';



export const Navbar:FC = () => {


  const { openSideMenu,closeSideMenu } = useContext(UiContext);
  const { orderSummary } = useContext(CartContext);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ iseSearchVisible, setIsSearchVisible ] = useState(false);

  const router = useRouter();
  const activePath = router.pathname.split('/')[2];
  const { numberOfItems } = orderSummary;

    
  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    router.push(`/search/${ searchTerm }`);
  }




  return (
    <AppBar>
        <Toolbar>
          <NextLink href="/" passHref legacyBehavior>
              <Link display='flex' alignItems='center' sx={{color:'black'}}>
                <Typography variant='h6' fontWeight={900}>Teslo |</Typography>
                <Typography variant='h6' sx={{ml:0.5}}>Shop</Typography>
              </Link>
          </NextLink>

          <Box flex={1}/>
          
          <Box 
            sx={{display: iseSearchVisible ? 'none' : { xs:'none', sm:'block'}}} 
            className='fadeIn'
          >
            <NextLink href="/category/men" passHref legacyBehavior>
                <Link>
                  <Button color={`${activePath == 'men' ? 'primary' : 'info'}`} >Hombres</Button>
                </Link>
            </NextLink>
            <NextLink href="/category/women" passHref legacyBehavior>
                <Link>
                  <Button color={`${activePath == 'women' ? 'primary' : 'info'}`}>Mujeres</Button>
                </Link>
            </NextLink>
            <NextLink href="/category/kid" passHref legacyBehavior>
                <Link>
                  <Button color={`${activePath == 'kid' ? 'primary' : 'info'}`}>Niños</Button>
                </Link>
            </NextLink>
          </Box>

          <Box flex={1}/>


          {
            iseSearchVisible 
              ?(
                
                  <Input
                    sx={{display:{xs:'none', sm:'flex'}}}
                    className='fadeIn'
                    type='text'
                    autoFocus
                    value={ searchTerm }
                    onChange={ (e) => setSearchTerm(e.target.value) }
                    onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                    placeholder="Buscar..."
                    endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton 
                                      className='fadeIn' 
                                      onClick={ () => setIsSearchVisible(false) }
                                    >
                                      <ClearOutlined/>
                                    </IconButton>
                                  </InputAdornment>
                                }
                  />
              )
              :(
                <IconButton onClick={() => setIsSearchVisible(true)} sx={{display:{xs:'none', sm:'flex'}}}>
                  <SearchOutlined/>
                </IconButton>
              )

          }

          <IconButton 
            sx={{display:{sx:'flex', sm:'none'}}}
            onClick={ openSideMenu } 
          >
            <SearchOutlined/>
          </IconButton>

          <NextLink href='/cart' passHref legacyBehavior>
            <Link>
              <IconButton>
                <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color='secondary' >
                  <ShoppingCartOutlined/> 
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button onClick={openSideMenu}>Menu</Button>

        </Toolbar>
    </AppBar>
  )
}