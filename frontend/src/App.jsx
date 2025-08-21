import React from 'react'
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile'
import Verify from './pages/Verify'
import SuccessPage from './pages/SuccessPage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const location = useLocation();

  // If we are on /success, skip NavBar, Footer, padding etc.
  const isSuccessPage = location.pathname === "/success";

  return (
    <div className="min-h-screen">
      <ToastContainer position='top-center'/>
      
      {isSuccessPage ? (
        // Show ONLY SuccessPage fullscreen
        <Routes>
          <Route path='/success' element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
        </Routes>
      ) : (
        // Default layout for other pages
        <div className='px-4 sm:px-[3vw] md:px-[7vw] lg:px-[9vw]'>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/collection' element={<Collection/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/product/:productId' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/verify' element={<ProtectedRoute><Verify/></ProtectedRoute>}/>
          </Routes>
          <Footer/>
        </div>
      )}
    </div>
  )
}

export default App
