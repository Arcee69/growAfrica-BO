import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import ReactPaginate from 'react-paginate';

import Empty from "../../../assets/png/empty.png"
import { Skeleton } from '@mui/material';
import ModalPop from '../../../components/modalPop';
import Details from './Details';
// import Approved from '../modals/Approved';


const ApprovedKycs = ({ allApprovedKyc, loading, setUserActionLoading, userActionLoading }) => {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailsData, setDetailsData] = useState([]);


  const navigate = useNavigate()

  const handleText = (e) => setText(e.target.value)

  console.log(allApprovedKyc, "allApprovedKyc")

  const filteredKyc = allApprovedKyc?.filter((item) => 
    item?.first_name?.toLowerCase().includes(text.toLowerCase()) ||
    item?.last_name?.toLowerCase().includes(text.toLowerCase()) || ""
    )

    //Get Current data
    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = filteredKyc?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredKyc?.length / perPage);

    
   

    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % filteredKyc?.length;
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
            placeholder='Search by Name'
            onChange={(e) => handleText(e)} 
            className='outline-none w-[146px]'
          />
          <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
        </div>
        <div className='w-[200px] h-[40px] bg-[#fff] p-2 flex items-center invisible justify-between rounded'>
          <p className='text-[#8B909A] font-Hat text-[15px]'>Filter by Capacity</p>
          <IoIosArrowDown className='w-4 h-4 text-[#8B909A]'/>
        </div>
      </div>

      {
        loading || userActionLoading ?
        <Skeleton  variant="rectangular" width={1080} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', marginTop: "20px" }} />
        :
        <>
          <table className='w-full bg-[#fff] rounded-tr-xl rounded-tl-xl mt-4'>
            <tr className='h-[48px]'>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Name
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Email
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Business Name
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Phone
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Status
              </th>
            </tr>

            {currentData?.length > 0 ? currentData?.map((data, index) => (
                <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100' > {/* onClick={() => navigate('/customers/details', { state: data }, window.scroll(0, 0))} */}
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-semibold font-Mont text-dark-100 text-center'>{`${data?.first_name} ${data?.last_name}`}</p> 
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-center'>{data?.email}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-center'>{data?.business_name || "N/A"}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                      <div className='text-center'>
                          <p className='text-sm font-Mont text-dark-100 capitalize'>{data?.phone}</p>
                      </div>
                    </td>
                    <td className='h-[70px] px-4'>
                      <div className={`rounded-lg h-8 flex mx-auto justify-center items-center ${data.kyc_status === "applied" && 'w-[99px]  bg-[#FFC60029]'} ${data.kyc_status === "approved"  && ' w-[99px] bg-[#ECFDF5]'} `}>
                          <p className={`text-sm font-Mont text-left font-semibold ${data.kyc_status === "applied" && 'text-[#FFC600]'} ${data.kyc_status === "approved" && 'text-[#10B981]'} `}>
                            {data.kyc_status === "applied"  ? "Applied" : "Approved"}
                          </p>
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

export default ApprovedKycs