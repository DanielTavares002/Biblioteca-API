import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    Button
} from '@mui/material';
import {
    Menu,
    Dashboard,
    Book,
    People,
    SwapHoriz,
    ChevronLeft
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Livros', icon: <Book />, path: '/livros' },
    { text: 'Usuários', icon: <People />, path: '/usuarios' },
    { text: 'Empréstimos', icon: <SwapHoriz />, path: '/emprestimos' },
];

export const Sidebar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const { secretario, logout } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const drawer = (
        <Box sx={{ 
            height: '100%', 
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider'
        }}>
            {/* Header da sidebar */}
            <Box sx={{
                p: 2, 
                borderBottom: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {!isCollapsed && (
                    <Typography variant="h6" component="div" fontWeight="bold" color="primary">
                        📚 Biblioteca
                    </Typography>
                )}
                <IconButton
                    onClick={handleToggleCollapse}
                    size="small"
                    sx={{
                        ml: isCollapsed ? 0 : 'auto',
                        color: 'text.secondary'
                    }}
                >
                    <ChevronLeft sx={{
                        transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }} />
                </IconButton>
            </Box>

            {/* Menu de itens */}
            <List sx={{ p: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={isMobile ? handleDrawerToggle : undefined}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                '&.Mui-selected': {
                                    bgcolor: 'primary.light',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                    },
                                },
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: isCollapsed ? 'auto' : 56,
                                color: 'inherit'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            {!isCollapsed && (
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Informações do usuário */}
            {!isCollapsed && secretario && (
                <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ textAlign: 'center', mb: 1 }}
                    >
                        Olá, {secretario.nome}!
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{ textAlign: 'center', display: 'block', mb: 2 }}
                    >
                        {secretario.email}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={logout}
                            sx={{
                                fontSize: '12px',
                                py: 0.5,
                                px: 2
                            }}
                        >
                            Sair
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );

    return (
        <>
            {/* Botão de menu mobile */}
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ 
                        position: 'fixed', 
                        top: 16, 
                        left: 16, 
                        zIndex: theme.zIndex.drawer + 1,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                >
                    <Menu />
                </IconButton>
            )}

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ 
                    width: { md: isCollapsed ? 80 : drawerWidth }, 
                    flexShrink: { md: 0 } 
                }}
            >
                {/* Drawer para mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth 
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Drawer para desktop */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: isCollapsed ? 80 : drawerWidth,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};