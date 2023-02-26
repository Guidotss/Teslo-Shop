import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { UiContext } from '../../context/ui/UiContext';
import { AuthContext } from '../../context/auth/AuthContext';

export const SideMenu = () => {
    
    
    const { isSidebarOpen,closeSideMenu } = useContext(UiContext);
    const { user,isLogged,logout } = useContext(AuthContext);
    const [ searchTerm, setSearchTerm ] = useState('');
    
    const router = useRouter();
    const role = user?.role;

    const onSearchTerm = () => {
       if(searchTerm.trim().length === 0) return;
       navigate(`/search/${ searchTerm }`);
    }

    const navigate = ( url:string ) => {
        router.push(`${ url }`);
        closeSideMenu();
    }

    
    

  return (
    <Drawer
        open={ isSidebarOpen }
        onClose={ closeSideMenu }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        type='text'
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={ onSearchTerm }>
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>



                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigate('/category/men')}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>
                
                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigate('/category/women')}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigate('/category/kid')}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>
                {
                    !isLogged
                        ? (
                            <ListItem button onClick={() => navigate(`/auth/login?p=${ router.asPath }`)}>
                                <ListItemIcon>
                                    <VpnKeyOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>

                        )
                        :(
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>

                                <ListItem button onClick={ logout }>
                                    <ListItemIcon>
                                        <LoginOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Salir'} />
                                </ListItem>
                            </>
                        )
                }




                {/* Admin */}
                {
                    role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
            
                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>
            
                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}