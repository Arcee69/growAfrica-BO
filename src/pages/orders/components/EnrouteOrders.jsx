import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Empty from "../../../assets/png/empty.png"
import { Skeleton } from '@mui/material';

const EnrouteOrders = ({ allEnrouteOrders, loading }) => {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0);

  const navigate = useNavigate()

  const handleText = (e) => setText(e.target.value)

  function timeAgo(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    const timeDifference = currentDate - inputDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // console.log(days, "days")
  
    if (days > 1) {
      return  `${days} days ago`;
    } else if (days === 1) {
      return '1 day ago';
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (hours === 1) {
      return '1 hour ago';
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else if (minutes === 1) {
      return '1 minute ago';
    } else if (seconds > 1) {
      return `${seconds} seconds ago`;
    } else {
      return 'just now';
    }
  }


    //Get Current data
    const filteredOrders = allEnrouteOrders?.filter((item) => 
      item?.id.toLowerCase().includes(text.toLowerCase()) || ""
    )

    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = filteredOrders?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredOrders?.length / perPage);



    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % filteredOrders?.length;
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
        <div className='w-[200px] h-[40px] bg-[#fff] p-2 flex items-center hidden justify-between rounded'>
          <p className='text-[#8B909A] font-Hat text-[15px]'>Filter by date range</p>
          <IoIosArrowDown className='w-4 h-4 text-[#8B909A]'/>
        </div>
      </div>
      {
        loading ?
        <Skeleton  variant="rectangular" width={1080} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', marginTop: "20px" }} />
        :
        <>
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

                {currentData?.length > 0 ? currentData?.map((data, index) => (
                    <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100' onClick={() => navigate('/orders/details', { state: data } )}>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{`#${data?.id?.substring(0, 8)}`}</p> 
                        </td>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-Mont text-dark-100 text-left'>{timeAgo(data?.updated_at)}</p>
                        </td>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-Mont text-dark-100 text-left'>{data?.customer || "N/A"}</p>
                        </td>
                        <td className='h-[70px] px-4'>
                            <p className='text-sm font-Mont text-dark-100 text-left'>{`₦${data?.total_amount}`}</p>
                        </td>
                        <td className='h-[70px] px-4'>
                            <div className={`rounded-lg h-8 flex justify-center items-center w-[78px]  bg-[#000]`}>
                                <p className={`text-sm font-Mont text-left font-semibold text-[#FFF]`}>Enroute</p>
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
        </>
      }
    </div>
  )
}

export default EnrouteOrders