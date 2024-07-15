import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import AllProducts from './components/AllProducts';
import ModalPop from '../../components/modalPop';
import AddProduct from './components/AddProduct';


const Products = () => {
    const [loading, setLoading] = useState(false)
    const [addProductloading, setAddProductLoading] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("All")
    const [openAddProduct, setOpenAddProduct] = useState(false)
   

    const search = searchTerm ?  `/search/${searchTerm}` : ""; 

    const getAllProducts = async () => {
        setLoading(true)
        await api.get(`${appUrls?.PRODUCTS_URL}${search}`)
        .then((res) => {
          console.log(res, "asap")
          setLoading(false)
          setAllProducts(res?.data?.data?.products)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err, "faro")
        })
      };
    
      console.log(allProducts, "allProducts")
    
      useEffect(() => {
        getAllProducts()
      }, [searchTerm, addProductloading])

      const handleText = (e) => setSearchTerm(e.target.value)

  return (
    <div className='p-8'>
        <div className='flex items-center justify-between'>
            <p className='text-[24px] text-[#23272E] font-bold'>Product Management</p>
            {/* <div className='bg-[#8CAD07] cursor-pointer flex items-center justify-between w-[169px] h-[38px] p-2 rounded' onClick={() => setOpenAddProduct(true)}>
                <p className='text-[#fff] font-Mont font-medium'>Add New Products</p>
            </div> */}
        </div>
        <div className='mt-[33px] '>
            {
                loading ?
                <Skeleton 
                    variant="rectangular" 
                    width={354} 
                    height={197} 
                    style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} 
                />
                :
                <div>
                    <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                    <div className='flex flex-col gap-[29px]'>
                        <div className='flex flex-col gap-1'>
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Products</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allProducts?.length}</p>
                            {/* <p>Last 7 days</p> */}
                        </div>
                    </div>
                    </div>
                </div>
            }
        </div>
        <div className='mt-[44px]'>
            <p 
                // onClick={() => handleChangeTab("All")} 
                className={`${activeTab === "All" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer text-center p-1 border border-[#27AE60] w-[97px] h-[38px]`}
            >
                All
            </p>
        </div>
        <hr />
        {activeTab === "All" && <AllProducts allProducts={allProducts} loading={loading} handleText={(e) => handleText(e)} />}
        <ModalPop isOpen={openAddProduct}>
            <AddProduct 
                handleClose={() => setOpenAddProduct(false)} 
                setAddProductLoading={() => setAddProductLoading()}
                addProductloading={addProductloading}
            />
        </ModalPop>
    </div>
  )
}

export default Products