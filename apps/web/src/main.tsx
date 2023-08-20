import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Signup from 'ui/components/authentication/Signup.tsx';
import Login from 'ui/components/authentication/Login.tsx';
import AllProducts from 'ui/components/products/AllProducts.tsx';
import IndProduct from 'ui/components/products/IndProduct.tsx'
import CartItems from 'ui/components/user/cart/CartItems.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/products' element={<AllProducts />} />
        <Route path='/getinditem/:id' element={<IndProduct />} />
        <Route path='/cart/all' element={<CartItems />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
)