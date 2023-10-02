import ReactDOM from 'react-dom/client'
import Nav from './components/Nav/Nav'
import './index.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Signup from './components/Auth/Signup/Signup'
import Login from './components/Auth/Login/Login'
import ProductUpload from './components/Admin/ProductUpload'
import Profile from './components/Profile/Profile'
import Categories from './components/Categories/Categories'
import AllProducts from './components/AllProducts/AllProducts'
import IndProduct from './components/AllProducts/IndProduct'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin/upload' element={<ProductUpload />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/products/:category' element={<AllProducts />} />
      <Route path='/product/:id' element={<IndProduct />} />
    </Routes>
  </BrowserRouter>
)

// 64feb46adbc838eab66a
// https://cloud.appwrite.io/v1