import { useState } from 'react'
import menu from './assets/menu.png'
import logo from "../src/assets/logo.png"

const App = () => {

  const [bottomBarState, setBottomBarState] = useState('block')
  const toggleBottomBarState = () => {
    if (bottomBarState === 'none') {
      setBottomBarState('block')
    } else {
      setBottomBarState('none')
    }
  }

  return (
    <nav className='fixed top-2 right-2 left-2 bg-slate-200 shadow-sm lg:flex lg:flex-row lg:items-center pb-3 rounded-lg'>
      <div className='flex items-center w-full justify-between p-5'>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div onClick={toggleBottomBarState} className='lg:hidden'>
          <img src={menu} className='w-5' alt="" />
        </div>
      </div>
      <div className='bottombar' style={{ display: bottomBarState }}>
        <ul className='px-5 lg:flex lg:flex-row lg:items-center'>
          <li className='m-2'>Sadhi</li>
          <li className='m-2'>Pata</li>
        </ul>
      </div>

      <div className='px-5' style={{ display: bottomBarState }}>
        <div className='flex flex-col lg:flex-row items-start'>
          <button type='button' className='m-2'>Signup</button>
          <button type='button' className='m-2'>Login</button>
        </div>
      </div>
    </nav>
  )
}

export default App