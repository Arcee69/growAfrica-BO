import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import AllCategories from './components/AllCategories';
import ModalPop from '../../components/modalPop';
import AddCategory from './components/AddCategory';


const Category = () => {
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [addCategoryLoading, setAddCategoryLoading] = useState(false)
    const [allCategory, setAllCategory] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("All")
    const [openAddCategory, setOpenAddCategory] = useState(false)
   

    const search = searchTerm ?  `/search/${searchTerm}` : ""; 

    const getAllCategory = async () => {
        setLoading(true)
        await api.get(`${appUrls?.GET_PRODUCTS_CATEGORY_URL}`)
        .then((res) => {
          console.log(res, "asap")
          setLoading(false)
          setAllCategory(res?.data?.data?.categories)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err, "faro")
        })
      };
    
      console.log(allCategory, "allCategory")
    
      useEffect(() => {
        getAllCategory()
      }, [searchTerm, addCategoryLoading, deleteLoading])

      const filteredProducts = allCategory?.filter((item) => 
        item?.name.toLowerCase().includes(searchTerm.toLowerCase()) || ""
      )

      const handleText = (e) => setSearchTerm(e.target.value)

  return (
    <div className='p-8'>
        <div className='flex items-center justify-between'>
            <p className='text-[24px] text-[#23272E] font-bold'>Category Management</p>
            <div className='bg-[#27AE60] cursor-pointer flex items-center justify-center w-[189px] h-[38px] p-2 rounded' onClick={() => setOpenAddCategory(true)}>
                <p className='text-[#fff] font-Mont font-medium'>Add New Category</p>
            </div>
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
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Category</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allCategory?.length}</p>
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
                className={`${activeTab === "All" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer p-1 border border-[#27AE60] w-[57px] h-[38px]`}
            >
                All
            </p>
        </div>
        <hr />
        {activeTab === "All" && <AllCategories allCategory={filteredProducts} loading={loading} deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} handleText={(e) => handleText(e)} />}
        <ModalPop isOpen={openAddCategory}>
            <AddCategory 
                handleClose={() => setOpenAddCategory(false)} 
                setAddCategoryLoading={setAddCategoryLoading}
                addCategoryLoading={addCategoryLoading}
                getAllCategory={getAllCategory}
            />
        </ModalPop>
    </div>
  )
}

export default Category