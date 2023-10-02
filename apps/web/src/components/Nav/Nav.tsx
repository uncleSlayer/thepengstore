import { useEffect, useState } from 'react'
import menu from '../../assets/menu.png'
import { useNavigate } from 'react-router-dom'
import { account } from 'appwriteconfig'
import { Models } from 'appwrite'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { firebaseApp, googleProvier } from 'firebase-config'
import { getAuth, signInWithPopup } from 'firebase-config'

const App = () => {

    // useEffect(() => {
    // const data = account.get()
    // data.then(
    //     (resp) => {
    //         setUserData(resp)
    //     },
    //     (err) => {
    //         console.log(err);
    //     }
    // )
    // console.log(userData)
    // }, [])

    const [userData, setUserData] = useState<Models.User<Models.Preferences>>()
    const navigate = useNavigate()
    const [bottomBarState, setBottomBarState] = useState('block')
    const toggleBottomBarState = () => {
        if (bottomBarState === 'none') {
            setBottomBarState('block')
        } else {
            setBottomBarState('none')
        }
    }
    const auth = getAuth()

    return (
        <nav className='fixed top-0 right-0 left-0 bg-blackbg lg:flex lg:flex-row lg:items-center pb-3'>
            <div className='flex items-center w-full justify-between py-5 px-3'>
                <div className="logo">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div onClick={toggleBottomBarState} className='lg:hidden'>
                    <img src={menu} className='w-8' alt="" />
                </div>
            </div>
            <div className='bottombar' style={{ display: bottomBarState }}>
                <ul className='px-5 lg:flex lg:flex-row lg:items-center w-80'>
                    <li className='my-1 cursor-pointer text-white font-sans'>Sambalpuri Saree</li>
                    <li className='my-1 cursor-pointer text-white font-sans'>Sambalpuri Pata</li>
                </ul>
            </div>

            <div className='px-1' style={{ display: bottomBarState }}>
                <div className='flex flex-col lg:flex-row items-start lg:items-center'>
                    {
                        userData ? <button className='px-4 cursor-pointer text-white' onClick={() => navigate('/profile')}>Profile</button> :
                            <><button type='button' onClick={() => { navigate('/signup') }} className='my-2 text-white bg-skytheme p-2 rounded-lg mx-2 font-sans'>Signup</button>
                                <button type='button' onClick={() => { navigate('/login') }} className='my-2 text-white bg-skytheme p-2 rounded-lg mx-2 font-sans'>Login</button>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default App