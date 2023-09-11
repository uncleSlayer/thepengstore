import { account } from 'appwriteconfig'
import { useState } from 'react'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLoginType } from 'type-checks'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginBtn = async (e: MouseEvent) => {
        e.preventDefault()

        try {
            console.log(email, password);

            await account.createEmailSession(
                email, password
            )
                .then(
                    () => {
                        navigate('/profile')
                    },
                    (err) => {
                        console.log(err);

                    }
                )
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='mt-24 mx-2'>
            <p className='text-lg my-5'>Login with an existing account</p>
            <form>
                <div className='my-2'>
                    <p>Email :</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='my-1 border-2 rounded-lg p-2 text-sm h-8' />
                </div>

                <div className='my-2'>
                    <p>Password :</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='my-1 border-2 rounded-lg p-2 text-sm h-8' />
                </div>

                <button onClick={handleLoginBtn} className='p-3 bg-slate-200 rounded-lg hover:shadow-lg'>Login</button>
            </form>
        </div>
    )
}

export default Login