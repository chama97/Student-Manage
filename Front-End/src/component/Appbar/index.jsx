import {Component} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';


class Appsbar extends Component{

  logout = (e) => {
    localStorage.removeItem('token');
    window.location.href = '/';
}

  
    render(){
  
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#2c2c6d' }}>
      <AppBar position="static" sx={{backgroundImage: 'linear-gradient(to right top, #b1c5eb, #c1d2f0, #d2e0f5, #e3edfa, #f6faff)'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0 }}
          >
            <AccountCircle  style={{fontSize:'50px', color:'#0073e6'}} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' ,fontSize:'31px', fontWeight:'bold', color:'#0073e6' } }}
          >
            Student
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                this.logout()
              }}
            >
              <LogoutIcon style={{fontSize:'50px', color:'red'}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
}
export default  Appsbar