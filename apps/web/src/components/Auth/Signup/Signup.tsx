import { useState } from 'react'
import { userSignupType } from 'type-checks'
import { account } from 'appwriteconfig'
import { MouseEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { SERVER_IP } from 'configs'

const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')

    const handleSignupBtn = async (e: MouseEvent) => {
        e.preventDefault()

        if (password !== repassword) {
            toast(`password doesn't match`)
            return
        }

        account.create(
            uuid(),
            email,
            password
        )
            .then(
                () => {
                    const userData: userSignupType = {
                        email: email,
                        password: password,
                        rePassword: repassword
                    }

                    fetch(
                        `${SERVER_IP}/usersignup`,
                        {
                            headers: {
                                'Content-type': 'Application/json'
                            },
                            method: 'post',
                            body: JSON.stringify(userData)
                        }
                    )

                    navigate('/login')
                },
                (err) => {
                    console.log(err);
                }
            )
    }

    return (
        <div className='p-3 bg-blackbg h-screen'>
            <p className='text-5xl mt-24 text-white'>Signup</p>
            <p className='mt-3 text-slate-300 text-lg'>Already have an account? <span className='text-skytheme'>Login</span></p>
            <form className='pt-3'>
                <div className='my-2'>
                    <p className='text-white p-1'>Email <span className='text-red-500'>*</span></p>
                    <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full bg-blackbg p-6 my-1 border-2 rounded-lg border-skytheme text-white text-sm h-8 font-sans' />
                </div>

                <div className='my-2'>
                    <p className='text-white p-1'>Password <span className='text-red-500'>*</span></p>
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full bg-blackbg border-skytheme p-6 my-1 border-2 rounded-lg text-white text-sm h-8 font-sans' />
                </div>

                <div className='my-2 w-full'>
                    <p className='text-white p-1 w-full'>Password<span className='text-red-500'>*</span></p>
                    <input aria-placeholder='Re enter your password' type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} className='w-full my-1 border-2 rounded-lg p-6 text-slate-300 text-sm h-8 bg-blackbg border-skytheme font-sans' placeholder='Enter your password' />
                </div>

                <Toaster />

                <button onClick={handleSignupBtn} className='p-3 bg-skytheme w-full rounded-lg hover:shadow-lg text-white font-sans'>Signup</button> </form> </div>
    )
}

export default Signup