import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from "../assets/svg/logo_white.svg"

import { RxDashboard } from "react-icons/rx";
import { BsFillBarChartFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";

const Sidebar = () => {

    const navigate = useNavigate()

    const location = useLocation()

  return (
    <div className='w-[270px] bg-[#27AE60] flex flex-col gap-[38px] pt-[11px]'>
        <img src={Logo} alt='logo' className='w-[54px] h-[61px] mx-[27px]'/>

        <div className='flex flex-col items-center gap-3'>
            <div onClick={() => {navigate("/dashboard"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/dashboard"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <RxDashboard  className={`${location.pathname === "/dashboard" ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/dashboard" ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Dashboard</p>
            </div>
            <div onClick={() => {navigate("/products"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/products" || location?.pathname === "/products/details"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <FiShoppingCart  className={`${location.pathname === "/products" || location?.pathname === "/products/details"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/products" || location?.pathname === "/products/details"   ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Products</p>
            </div>
            <div onClick={() => {navigate("/category"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/category"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <TbCategory  className={`${location.pathname === "/category"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/category" ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Category</p>
            </div>
            <div onClick={() => {navigate("/orders"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/orders" || location?.pathname === "/orders/details"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <BsFillBarChartFill  className={`${location.pathname === "/orders" || location?.pathname === "/orders/details"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/orders" || location?.pathname === "/orders/details"   ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Orders</p>
            </div>
            <div onClick={() => {navigate("/customers"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/customers" || location?.pathname === "/customers/details"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <FaRegUser  className={`${location.pathname === "/customers" || location?.pathname === "/customers/details"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/customers" || location?.pathname === "/customers/details"   ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Customers</p>
            </div>
            <div onClick={() => {navigate("/vendors"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/vendors" || location?.pathname === "/vendors/details"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <FaRegUser  className={`${location.pathname === "/vendors" || location?.pathname === "/vendors/details"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/vendors" || location?.pathname === "/vendors/details"   ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Vendors</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar