import { useState } from 'react'
import menu from '../../assets/menu.png'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'


const App = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const [bottomBarState, setBottomBarState] = useState('block')
    const toggleBottomBarState = () => {
        if (bottomBarState === 'none') {
            setBottomBarState('block')
        } else {
            setBottomBarState('none')
        }
    }

    return (
        <nav className='fixed top-0 right-0 left-0 bg-blackbg lg:flex lg:flex-row lg:items-center pb-3'>
            <div className='flex items-center w-full justify-between py-5 px-3 maxwt'>
                <div className="logo">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div onClick={toggleBottomBarState} className='lg:hidden'>
                    <img src={menu} className='w-8' alt="" />
                </div>
            </div>
            <div className='maxwt flex flex-col lg:flex-row lg:items-center'>
                <div className='bottombar' style={{ display: bottomBarState }}>
                    <ul className='px-5 gap-5 lg:flex lg:flex-row lg:items-center w-80'>
                        <li className='my-1 cursor-pointer text-white font-sans'>
                            <Link to='categories'>Categories</Link>
                        </li>
                        <li className='my-1 cursor-pointer text-white font-sans'>
                            <Link to='cart/all'>Cart</Link>
                        </li>
                    </ul>
                </div>

                <div className='px-1' style={{ display: bottomBarState }}>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center'>
                        {
                            user ? <button className='my-2 text-white bg-skytheme p-2 rounded-lg mx-2 font-sans' onClick={() => navigate('/profile')}>Profile</button> :
                                <><button type='button' onClick={() => { navigate('/signup') }} className='my-2 text-white bg-skytheme p-2 rounded-lg mx-2 font-sans'>Signup</button>
                                    <button type='button' onClick={() => { navigate('/login') }} className='my-2 text-white bg-skytheme p-2 rounded-lg mx-2 font-sans'>Login</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default App