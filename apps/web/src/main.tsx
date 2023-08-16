import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Signup from 'ui/components/authentication/Signup.tsx';
import Login from 'ui/components/authentication/Login.tsx';
import AllProducts from 'ui/components/products/AllProducts.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/products' element={<AllProducts />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
)