import React, { useState, useEffect } from 'react'
import { Skeleton } from '@mui/material'
import { CiSearch } from 'react-icons/ci'
import ReactPaginate from 'react-paginate'
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'

import Empty from "../../../assets/png/empty.png"

const allCategories = ({ loading, allCategory, handleText, deleteLoading, setDeleteLoading }) => {  
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10)
    const [itemOffset, setItemOffset] = useState(0);
   

    //Get Current data
    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = allCategory?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allCategory?.length / perPage);
   
   
    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % allCategory.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const deleteCategory = async (item) => {
        console.log(item, "zanku")
        setDeleteLoading(true)
        try {
            const res = await api.delete(`${appUrls?.DELETE_CATEGORY_URL}/${item?.id}`);
            setDeleteLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            });
        } catch (err) {
            setDeleteLoading(false)
            console.log(err, 'Casper');
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            });
        } 
    };

  return (
    <div className='mt-6'>
    <div className='flex items-center justify-between'>
      <div className='w-[200px] h-[40px] bg-[#fff] flex items-center justify-between rounded p-2'>
        <input 
          name='search' 
          type='text' 
          placeholder='Search Category'
          onChange={(e) => handleText(e)} 
          className='outline-none w-[146px]'
        />
        <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
      </div>
    </div>
    {
       loading || deleteLoading ?
       <Skeleton  variant="rectangular" width={1080} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', marginTop: "20px" }} />
       :
       <>
        <table className='w-full bg-[#fff] rounded-tr-xl rounded-tl-xl mt-4'>
              <tr className='h-[48px]'>
                <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                    ID
                </th>
                <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                    Category Name
                </th>
                <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                    Created Date
                </th>
                <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                    Action
                </th>
              </tr>

              {allCategory?.length > 0 ? allCategory?.map((data, index) =>  {
                return (
                    <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100'>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{`#${data?.id?.substring(0, 8)}`}</p> 
                        </td>
                     
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-Mont text-dark-100 text-left'>{data?.name || "N/A"}</p>
                        </td>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-Mont text-dark-100 text-left'>{new Date(data?.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className='h-[70px] px-4'>
                            <div className='flex items-center gap-2'> 
                                <MdDeleteForever className='text-[#f00] w-5 h-5 cursor-pointer' onClick={() => deleteCategory(data)}/>
                            </div>
                        </td>
                      
                    </tr>
                )
            }) : ( 
                  <tr className='h-[654px] bg-white border-t border-grey-100'>
                      <td colSpan="8" className="relative">
                          <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='flex flex-col gap-2 items-center'>
                                  <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/>
                                  <p>Oops! Nothing to see here.</p>
                              </div>
                          </div>
                      </td>
                  </tr>
              )}
        </table>
        <div className=' mb-5 bg-[#fff]'>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                className='w-full flex gap-3 font-Mont text-dark-100 font-semibold justify-end py-2 pr-10'
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
       </>
    }
  </div>
  )
}

export default allCategories