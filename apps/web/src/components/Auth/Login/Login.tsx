import { MouseEvent } from 'react'
import { getAuth, signInWithPopup, googleProvier } from 'firebase-config'
import { GoogleAuthProvider } from 'firebase/auth'
import { SERVER_IP } from 'configs'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const handleLoginBtn = async (e: MouseEvent) => {
        e.preventDefault()

        try {

            const auth = getAuth()
            signInWithPopup(auth, googleProvier)
                .then(async (resp) => {
                    console.log(resp);
                    const accessToken = await resp.user.getIdToken()

                    fetch(
                        `${SERVER_IP}/login`,
                        {
                            method: 'post',
                            headers: {
                                'Content-type': "application/json"
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                token: accessToken
                            })
                        }
                    )
                        .then(resp => {
                            return resp.json()
                        })

                        .then((resp) => {
                            console.log(resp);
                            if (accessToken) {
                                navigate('/categories')
                            }
                        })
                })

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='p-2 bg-blackbg h-screen flex justify-center items-center flex-col'>
            <p className='text-5xl mb-6 text-white'>Login</p>
            <form>
                <button onClick={handleLoginBtn} className='p-3 mt-5 bg-skytheme w-full rounded-lg hover:shadow-lg text-white font-sans'> Login with google </button>
            </form>
        </div>
    )
}

export default Login