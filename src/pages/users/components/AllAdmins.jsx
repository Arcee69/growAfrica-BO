import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import ReactPaginate from 'react-paginate';

import Empty from "../../../assets/png/empty.png"
import { Skeleton } from '@mui/material';
import ModalPop from '../../../components/modalPop';
import Approved from '../modals/Approved';
import Suspend from '../modals/Suspend';
import Delete from '../modals/Delete';

const AllAdmins = ({ allAdmins, loading, setUserActionLoading, userActionLoading }) => {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0);
  const [openApprove, setOpenApprove] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [approveData, setApproveData] = useState([]);
  const [suspendData, setSuspendData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);

  const navigate = useNavigate()

  const handleText = (e) => setText(e.target.value)

    //Get Current data
    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = allAdmins?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allAdmins?.length / perPage);


    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % allAdmins?.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

      const filteredUsers = currentData?.filter((item) => 
        item?.first_name?.toLowerCase().includes(text.toLowerCase()) || ""
      )

  return (
    <div className='mt-6'>
      <div className='flex items-center justify-between'>
        <div className='w-[200px] h-[40px] bg-[#fff] flex items-center justify-between rounded p-2'>
          <input 
            name='search' 
            type='text' 
            placeholder='Search by name'
            onChange={(e) => handleText(e)} 
            className='outline-none w-[146px]'
          />
          <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
        </div>
        <div className='w-[200px] h-[40px] bg-[#fff] hidden p-2 flex items-center justify-between rounded'>
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
                Contact
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Role
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Status
              </th>
              <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-center">
                Action
              </th>
            </tr>

            {filteredUsers?.length > 0 ? filteredUsers?.map((data, index) => (
                <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100' > {/* onClick={() => navigate('/customers/details', { state: data }, window.scroll(0, 0))} */}
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-semibold font-Mont text-dark-100 text-center'>{`${data?.first_name} ${data?.last_name}`}</p> 
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-center'>{data?.email}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                        <p className='text-sm font-Mont text-dark-100 text-center'>{data?.contact || "N/A"}</p>
                    </td>
                    <td className='h-[70px] px-4'>
                      <div className='text-center'>
                          <p className='text-sm font-Mont text-dark-100 capitalize'>{data?.role}</p>
                      </div>
                    </td>
                    <td className='h-[70px] px-4'>
                      <div className={`rounded-lg h-8 flex mx-auto justify-center items-center ${!data.status && 'w-[99px]  bg-[#FFC60029]'} ${data.status  && ' w-[99px] bg-[#ECFDF5]'} `}>
                          <p className={`text-sm font-Mont text-left font-semibold ${!data.status && 'text-[#FFC600]'} ${data.status && 'text-[#10B981]'} `}>
                            {data.status  ? "Active" : "InActive"}
                          </p>
                      </div>
                    </td>
                    <td className='h-[70px] px-4 flex justify-center items-center'>
                        <Popover className="relative">
                            <Popover.Button className="outline-none">
                                <div className='cursor-pointer '>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="18" viewBox="0 0 5 18" fill="none">
                                    <path d="M1.04153 14.8333C1.04153 15.75 1.69778 16.5 2.49987 16.5C3.30195 16.5 3.9582 15.75 3.9582 14.8333C3.9582 13.9167 3.30195 13.1667 2.49987 13.1667C1.69778 13.1667 1.04153 13.9167 1.04153 14.8333ZM1.04153 3.16667C1.04153 4.08333 1.69778 4.83333 2.49987 4.83333C3.30195 4.83333 3.9582 4.08333 3.9582 3.16667C3.9582 2.25 3.30195 1.5 2.49987 1.5C1.69778 1.5 1.04153 2.25 1.04153 3.16667ZM1.04153 9C1.04153 9.91667 1.69778 10.6667 2.49987 10.6667C3.30195 10.6667 3.9582 9.91667 3.9582 9C3.9582 8.08333 3.30195 7.33333 2.49987 7.33333C1.69778 7.33333 1.04153 8.08333 1.04153 9Z" stroke="#5F6368" stroke-width="1.5"/>
                                  </svg>
                                </div>
                            </Popover.Button>
                            <Popover.Panel>
                                <Popover.Button
                                    style={{boxShadow: '0px 13px 40px 0px rgba(0, 0, 0, 0.15)'}}
                                    className="cursor-pointer py-2 px-4 w-[192px] rounded-lg z-10 flex flex-col  absolute bg-white border border-grey-100 right-10"
                                >
                                  {
                                    data?.status ?
                                    <p onClick={() => {setOpenSuspend(true); setSuspendData(data)}} className='w-full p-2 bg-white hover:bg-[#ccc] hover:rounded-lg text-start text-[15px]'>Deactivate</p>
                                    :
                                    <p onClick={() => {setOpenApprove(true); setApproveData(data)}} className='w-full p-2 bg-white hover:bg-[#ccc] hover:rounded-lg text-start text-[15px]'>Activate</p>
                                  }
                                </Popover.Button>
                            </Popover.Panel>
                        </Popover>
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

      <ModalPop isOpen={openApprove}>
        <Approved 
          handleClose={() => setOpenApprove(false)} 
          approveData={approveData} 
          userActionLoading={userActionLoading} 
          setUserActionLoading={setUserActionLoading} 
        />
      </ModalPop>

      <ModalPop isOpen={openSuspend}>
        <Suspend 
          handleClose={() => setOpenSuspend(false)} 
          suspendData={suspendData} 
          userActionLoading={userActionLoading} 
          setUserActionLoading={setUserActionLoading}
        />
      </ModalPop>

      <ModalPop isOpen={openDelete}>
        <Delete handleClose={() => setOpenDelete(false)} deleteData={deleteData} />
      </ModalPop>

    </div>
  )
}

export default AllAdmins