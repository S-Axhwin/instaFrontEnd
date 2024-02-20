import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, redirect } from 'react-router-dom';
import { Button } from '@mui/material';


const AuthrizedNav = ({auth, setAuth})=>{
  const [user, setUser] = React.useState("")

  React.useEffect(()=>{
    const Username = JSON.parse(localStorage.getItem("userData"))
    setUser(Username.username);

  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const logout = ()=>{
    const conf = confirm("Do you want to logout?");
    console.log(conf);
    if(conf){
      localStorage.clear();
      redirect("/reg");
      setAuth(false)
    }
    handleClose();
  }
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange1 = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu1}
                color="inherit"
              >
                <MenuIcon></MenuIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl1)}
                onClose={handleClose1}
              >
                <MenuItem onClick={handleClose1}>
                  <Link to={'/post'}>Post</Link>
                </MenuItem>
                <MenuItem onClick={handleClose1}>
                  <Link to={'/newpost'}>New Post</Link>
                </MenuItem>
              </Menu>
            </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Insta
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar>{user[0]+user[1]}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Button onClick={handleClose}>Profile</Button>
                <Button onClick={handleClose}>My account</Button>
                <Button onClick={logout}>
                  <Link to={'/login'}>LOGOUT</Link>
                </Button>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const UnAuthrized = ()=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const logout = ()=>{
    const conf = confirm("Do you want to logout?");
    if(conf){
      setAuth(false);
      localStorage.clear();
      redirect("/login")
    }
    handleClose();
  }
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange1 = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Insta
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Button onClick={handleClose}>
                  <Link to={'/login'}>LOGIN</Link>
                </Button>
                <Button onClick={handleClose}>
                  <Link to={'/reg'}>SIGNUP</Link>
                </Button>
              </Menu>
            </div>
        </Toolbar>
        
      </AppBar>
    </Box>
  );
}

export default function MenuAppBar({auth, setAuth}) {
  return<>
  {console.log(auth)}
  {auth?<AuthrizedNav auth={auth} setAuth={setAuth}>hi</AuthrizedNav>:<UnAuthrized></UnAuthrized>}
  </>
}