import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Empty from "../../../assets/png/empty.png"

const Cancelled = ({ loading, allReturnedOrders}) => {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0);

  const navigate = useNavigate()

  const handleText = (e) => setText(e.target.value)

    //Get Current data
    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = allReturnedOrders.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allReturnedOrders.length / perPage);


    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % allReturnedOrders.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

  return (
    <div className='mt-6'>
      <div className='flex items-center justify-between'>
        <div className='w-[200px] h-[40px] bg-[#fff] flex items-center justify-between rounded p-2'>
          <input 
            name='search' 
            type='text' 
            placeholder='Search by order id'
            onChange={(e) => handleText(e)} 
            className='outline-none w-[146px]'
          />
          <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
        </div>
        <div className='w-[200px] h-[40px] bg-[#fff] p-2 flex items-center justify-between rounded'>
          <p className='text-[#8B909A] font-Hat text-[15px]'>Filter by date range</p>
          <IoIosArrowDown className='w-4 h-4 text-[#8B909A]'/>
        </div>
      </div>
      <table className='w-full bg-[#fff] rounded-tr-xl rounded-tl-xl mt-4'>
            <tr className='h-[48px]'>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                  Order ID
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                  Created
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                  Customer
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                  Total
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                  Status
              </th>
            </tr>

            {allReturnedOrders?.length > 0 ? allReturnedOrders?.map((data, index) => (
                <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100'>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{data?.id}</p> 
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-left'>{data?.created}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-left'>{data?.customer}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-left'>{data?.total}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                        <div className={`rounded-lg h-8 flex justify-center items-center w-[92px] bg-[#FFF1F2] `}>
                            <p className={`text-sm font-Mont font-semibold text-left text-[#F43F5E]`}>{data.status}</p>
                        </div>
                    </td>
                </tr>
            )) : (
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
    </div>
  )
}

export default Cancelled