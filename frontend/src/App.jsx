import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './pages/ProductDetail'
import ForgotPasswordRequest from './pages/ForgotPasswordRequest'
import ResetPassword from './pages/ResetPassword'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import Products from './pages/admin/Products'
import Users from './pages/admin/Users'

const App = () => {
  return (
    <div>

      <ToastContainer/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/product/:id" element = {<ProductDetail/>}/>
        <Route path = "/forgot-password-request" element = {<ForgotPasswordRequest/>}/>
        <Route path = "/reset-password/:token" element = {<ResetPassword/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route path="users" element={<Users/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
