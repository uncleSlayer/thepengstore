import ReactDOM from 'react-dom/client'
import Nav from './components/Nav/Nav'
import './index.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Signup from './components/Auth/Signup/Signup'
import Login from './components/Auth/Login/Login'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
)

// 64feb46adbc838eab66a
// https://cloud.appwrite.io/v1