import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Orders from '../pages/orders'
import Layouts from '../layouts'
import CustomersDetails from '../pages/customers/info/Info'
import OrderDetails from '../pages/orders/info/Info'
import CompletedOrderDetails from '../pages/orders/completed'
import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes'
import Login from '../pages/auth/login'
import Products from '../pages/products'
import Category from '../pages/category'
import Vendors from '../pages/vendors'


const Routers = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 1200; // Adjust the threshold as needed
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  return (
    <Routes>
      {isMobile ? (
          <Route exact path="/" element={<div className='flex flex-col items-center justify-center h-screen'><p className='text-[#000] text-3xl'>Best Experience in Desktop</p></div>} />
        ) : (
          <>
            <Route element={<ProtectRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/category' element={<Category />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/customers/details' element={<CustomersDetails />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/details' element={<OrderDetails />} />
                <Route path='/orders/completed' element={<CompletedOrderDetails />} />
                <Route path='/vendors' element={<Vendors />} />
            </Route>

            <Route element={<AuthProtectRoutes />}>
                <Route path='/' element={<Login />} />
            </Route>
          </>
        )
      }

    </Routes>
  )
}

export default Routers