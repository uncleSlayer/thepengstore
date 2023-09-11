import { useState } from 'react'
import { userSignupType } from 'type-checks'
import { account } from 'appwriteconfig'
import { MouseEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')

    const handleSignupBtn = (e: MouseEvent) => {
        e.preventDefault()
        account.create(
            uuid(),
            email,
            password
        )
            .then(
                () => {
                    navigate('/login')
                },
                (err) => {
                    console.log(err);
                }
            )
    }

    return (
        <div className='mt-24 mx-2'>
            <p className='text-lg my-5'>Signup for an account</p>
            <form>
                <div className='my-2'>
                    <p>Email :</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='my-1 border-2 rounded-lg p-2 text-sm h-8' />
                </div>

                <div className='my-2'>
                    <p>Password :</p>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='my-1 border-2 rounded-lg p-2 text-sm h-8' />
                </div>

                <div className='my-2'>
                    <p>re enter password :</p>
                    <input type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} className='my-1 border-2 rounded-lg p-2 text-sm h-8' />
                </div>

                <button onClick={handleSignupBtn} className='p-3 bg-slate-200 rounded-lg hover:shadow-lg'>Signup</button>
            </form>
        </div>
    )
}

export default Signup