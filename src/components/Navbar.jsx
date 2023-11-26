import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Tune } from '@mui/icons-material';
import useUserRole from '../hooks/useUserRole';
// const pages = ["Home", "Available Camps", "Dashboard", "Contact  Us"];
const pages = [
  {
    navName: 'Home',
    path: '/'
  },
  {
    navName: 'Available Camps',
    path: '/available_camp'
  },
  {
    navName: 'Dashboard',
    path: '/dashboard'
  },
  {
    navName: 'Contact  Us',
    path: '/contact_us'
  }
]

const Navbar = () => {
  const { user, logoutUser, loading, setUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const getRole = useUserRole();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };
  const handleLogOUt = () => {
    logoutUser()
    .then(() => {
      setAnchorElUser(null);
      getRole.userRole = '';
      toast.success("Logout successfully");
    })
    .catch((error) => {
      toast.error(error.message)
    })
  }


    return (
        <AppBar style={{background: 'linear-gradient(90deg, rgba(3,4,94,0.9329061624649859) 0%, rgba(0,150,193,0.88) 53%, rgba(0,119,182,1) 100%)', padding: '11px 0'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img style={{width: '30px', marginRight: '8px', borderRadius: '50%',}} src="./logo.png" alt="" />
          <Typography
          width={'400px'}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.07rem',
              color: 'inherit',
              fontSize: '24px',
              textDecoration: 'none',
            }}
          >
            Well<span style={{color: '#48CAE4'}}>Nex</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', color: '$000000' },
              }}
            >
                 <NavLink style={{textDecoration: 'none'}} to={'/'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#000000', display: 'block', width: '300px' }}
              >
                Home
              </Button>
              )}
            </NavLink>
              <NavLink style={{textDecoration: 'none'}} to={'/available_camp'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#000000', display: 'block' }}
              >
                Available Camps
              </Button>
              )}
            </NavLink>

              {
                getRole?.userRole === 'Participants' && <NavLink style={{textDecoration: 'none'}} to={'/dashboar'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#000000', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
              </NavLink>
              }
              {
                getRole?.userRole === 'Organizers' && <NavLink style={{textDecoration: 'none'}} to={'/dashboar'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#000000', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
              </NavLink>
              }
              {
                getRole?.userRole === 'Healthcare Professionals' && <NavLink style={{textDecoration: 'none'}} to={'/dashboar'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#000000', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
              </NavLink>
              }

              
              <NavLink style={{textDecoration: 'none'}} to={'/contact_us'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#000000', display: 'block' }}
              >
                Contact Us
              </Button>
              )}
            </NavLink>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WellNex
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '20px' }}>
          
              <NavLink style={{textDecoration: 'none'}} to={'/'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              )}
            </NavLink>
              <NavLink style={{textDecoration: 'none'}} to={'/available_camp'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Available Camps
              </Button>
              )}
            </NavLink>
            
            {
              getRole?.userRole === 'Participants' && 
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/participant-profile'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
               </NavLink>
              }
              {
                getRole?.userRole === 'Organizers' && 
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/organizer-profile'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
               </NavLink>
              }
              {
                getRole?.userRole === 'Healthcare Professionals' && 
                <NavLink style={{textDecoration: 'none'}} to={'/professional-profile'}>
                {({ isActive }) => (
                    <Button
                  className={isActive ? "activedfdfdfLinkNav" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
                )}
               </NavLink>
              }
              {
              !user?.email && <NavLink style={{textDecoration: 'none'}} to={'/dashboard'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button>
              )}
             </NavLink>
            }
              <NavLink style={{textDecoration: 'none'}} to={'/contact_us'}>
              {({ isActive }) => (
                  <Button
                className={isActive ? "activedfdfdfLinkNav" : ""}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Contact Us
              </Button>
              )}
            </NavLink>



          </Box>
          {
            user ?
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{border: '4px solid #e6e6e6'}} alt="Remy Sharp" src={user?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '55px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                  <Typography py={'5px'} width={'200px'} textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem>
                  <Typography py={'5px'} width={'200px'} textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem>
                  <Typography py={'5px'} width={'200px'} textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogOUt}>
                  <Typography py={'5px'} bgcolor={'#0077B6'} color={'white'} width={'200px'} textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
           
            : 
            <Box display={'flex'} gap={'30px'}>
            <Link to={'/signup'}>
            <Button sx={{bgcolor: '#00B4D8', color: '#ffffff', fontWeight: '600', py: '8px','&:hover': {background: '#0096C7', color: '#ffffff'}}} variant='contained'>Signup</Button>
            </Link>
            <Link to={'/signin'}>
            <Button sx={{bgcolor: '#00B4D8', color: '#ffffff', fontWeight: '600', py: '8px','&:hover': {background: '#0096C7', color: '#ffffff'}}} variant='contained'>Login</Button>
            </Link>
            </Box>
          }

        </Toolbar>
      </Container>
      
    </AppBar>
    );
};

export default Navbar;