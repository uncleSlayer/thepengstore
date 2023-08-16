import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SERVER_IP } from "configs"
import { useState } from 'react';
import { userSignupType } from "type-checks"
import toast, { Toaster } from 'react-hot-toast';



const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')

    const signupData: userSignupType = {
        email: email,
        password: password,
        rePassword: repassword
    }

    const signUpClicked = async () => {
        const result = await fetch(SERVER_IP + "/usersignup", {
            method: 'post',
            body: JSON.stringify(signupData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: password
            }
        })

        toast('account created successfully', {
            icon: '✔️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontFamily: 'roboto'
            }
        })

        console.log(result)

    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', flexDirection: 'column' }}>
            <TextField variant='outlined' label='Email' sx={{ margin: '0.5%' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField variant='outlined' label='Password' type='password' sx={{ margin: '0.5%' }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField variant='outlined' label='re enter password' type='password' sx={{ margin: '0.5%' }} value={repassword} onChange={(e) => setRePassword(e.target.value)} />
            <Typography sx={{ fontSize: '0.7rem', margin: '1%' }}>Password must be more than 6 characters and less than 20.</Typography>
            <Button variant='contained' onClick={signUpClicked} >Signup</Button>
            <Toaster />
        </Box>
    )
}

export default Signup
