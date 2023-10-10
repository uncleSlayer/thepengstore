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
import Cart from './components/Cart/Cart'
import Address from './components/Order/Address'
import { RecoilRoot } from 'recoil'
import SuccessPayment from './components/Order/SuccessPayment'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { AuthProvider } from './components/AuthProvider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <Nav />
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<div className='mt-24'>hi</div>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/upload' element={<ProductUpload />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/products/:category' element={<AllProducts />} />
          <Route path='/product/:id' element={<IndProduct />} />
          {/* <Route path='/cart/all/*' element={<PrivateRoute Component={Cart} path='/cart/all/*' />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path='/cart/all' element={<Cart />} />
          </Route>
          <Route path='/order/address' element={<Address />} />
          <Route path='/success' element={<SuccessPayment />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </RecoilRoot>
)