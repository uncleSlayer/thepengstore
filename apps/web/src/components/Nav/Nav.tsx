import { useEffect, useState } from 'react'
import menu from '../../assets/menu.png'
import { useNavigate } from 'react-router-dom'
import { account } from 'appwriteconfig'
import { Models } from 'appwrite'

const App = () => {

    useEffect(() => {
        const data = account.get()
        data.then(
            (resp) => {
                setUserData(resp)
            },
            (err) => {
                console.log(err);

            }
        )
    }, [])

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

    return (
        <nav className='fixed top-2 right-2 left-2 bg-slate-200 shadow-lg lg:flex lg:flex-row lg:items-center pb-3 rounded-lg'>
            <div className='flex items-center w-full justify-between p-5'>
                <div className="logo">
                    <h3 className='cursor-pointer' onClick={() => navigate('/')}>KoshalFabrics</h3>
                </div>
                <div onClick={toggleBottomBarState} className='lg:hidden'>
                    <img src={menu} className='w-5' alt="" />
                </div>
            </div>
            <div className='bottombar' style={{ display: bottomBarState }}>
                <ul className='px-5 lg:flex lg:flex-row lg:items-center'>
                    <li className='m-2 cursor-pointer'>Sadhi</li>
                    <li className='m-2 cursor-pointer'>Pata</li>
                </ul>
            </div>

            <div className='px-1' style={{ display: bottomBarState }}>
                <div className='flex flex-col lg:flex-row items-start lg:items-center'>
                    {
                        userData ? <button className='px-5 cursor-pointer'>Profile</button> :
                            <><button type='button' onClick={() => { navigate('/signup') }} className='my-2'>Signup</button>
                                <button type='button' onClick={() => { navigate('/login') }} className='my-2'>Login</button>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default App