import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
//import page 
import Home from "./Pages/Home.jsx"
import About from "./Pages/About.jsx"
import Cart from "./Pages/Cart.jsx"
import Collection from "./Pages/Collection.jsx"
import Contact from "./Pages/Contact.jsx"
import Login from "./Pages/Login.jsx"
import Orders from "./Pages/Orders.jsx"
import PlaceOrders from "./Pages/PlaceOrders.jsx"
import Product from "./Pages/Product.jsx"
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import Admin from './Pages/Admin.jsx'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/Admin')

  if (isAdminRoute) {
    return (
      <div className='px-4 sm:px-[5vw] md:px[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Routes>
          <Route path='/Admin/Login' element={<AdminLogin />} />
          <Route path='/Admin' element={<Admin />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Orders' element={<Orders />} />
        <Route path='/PlaceOrders' element={<PlaceOrders />} />
        <Route path='/Product/:productid' element={<Product />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App