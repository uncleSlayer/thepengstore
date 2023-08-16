import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SERVER_IP } from "configs"
import { useState } from 'react';
import { userLoginType } from "type-checks"
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginData: userLoginType = {
        email: email,
        password: password
    }

    const loginClicked = async () => {
        const result = await fetch(SERVER_IP + "/login", {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        toast('Logged in successfully', {
            icon: '✔️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        })

        console.log(result)

    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', flexDirection: 'column' }}>
            <TextField variant='outlined' label='Email' sx={{ margin: '0.5%' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField variant='outlined' label='Password' type='password' sx={{ margin: '0.5%' }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant='contained' onClick={loginClicked} >Login</Button>
            <Toaster />
        </Box>
    )
}

export default Login
