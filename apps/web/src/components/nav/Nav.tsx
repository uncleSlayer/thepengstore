import AppBar from '@mui/material/AppBar';
import logo from '../../assets/logo/png/logo-no-background.png'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import '@fontsource/roboto/400.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const Nav = () => {
    return (
        <div>
            <AppBar sx={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <img src={logo} style={{ width: '15%', margin: '1%' }} alt="" />
                <Box className="nav-menu" style={{ display: 'flex', width: '100%', justifyContent: 'end', fontFamily: 'roboto' }}>
                    <Link sx={{ marginRight: '2%', textDecoration: 'none', color: 'black', cursor: 'pointer' }}>Kids Wear</Link>
                    <Link sx={{ marginRight: '2%', textDecoration: 'none', color: 'black', cursor: 'pointer' }}>Mens Wear</Link>
                    <Link sx={{ marginRight: '1%', textDecoration: 'none', color: 'black', cursor: 'pointer' }}>Womens Wear</Link>
                </Box>
                <ButtonGroup variant='contained' sx={{ marginRight: '2%' }} >
                    <Button>Signup</Button>
                    <Button>Login</Button>
                </ButtonGroup>
            </AppBar>
        </div>
    )
}

export default Nav