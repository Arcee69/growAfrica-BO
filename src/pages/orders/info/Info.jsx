import React, { useState } from 'react'
import { IoIosArrowBack, IoMdDoneAll } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';

import Details from './Details';
import Invoices from './Invoices';
import ModalPop from '../../../components/modalPop';
import AssignOrder from './AssignOrder';
import OrderComplete from './OrderComplete';
import DeliveredOrder from './DeliveredOrder';

const OrderDetails = () => {
    const [activeTab, setActiveTab] = useState("Details")
    const [openAssignOrder, setOpenAssignOrder] = useState(false)
    const [openOrderComplete, setOpenOrderComplete] = useState(false)
    const [openDeliveredOrder, setOpenDeliveredOrder] = useState(false)

    const navigate = useNavigate()

    const { state } = useLocation()

    console.log(state, "dddo")

    const status  = "Pending" 

    const handleChangeTab = (tab) => setActiveTab(tab)


  return (
    <div className='p-8'>
        <div className='flex cursor-pointer items-center gap-2' onClick={() => navigate(-1)}>
            <div className='w-[32px] h-[32px] bg-[#EDF2F7] items-center  rounded-full flex justify-center'>
                <IoIosArrowBack />
            </div>
            <p className='text-[#071827] font-sm font-Mont'>Orders</p>
        </div>
        <div className='flex flex-col gap-2 mt-6'>
            <div className='flex items-center gap-2'>
                <p className='text-[#071827] text-[32px] font-medium font-Mont'>{`#${state?.id?.substring(0, 8)}`}</p>
                <p className='font-Mont text-[#5C6F7F] text-base'>{`${new Date(state?.created_at).toDateString().slice(3)} at ${new Date(state?.created_at).toLocaleTimeString()} `}</p>
                <div className={`rounded-lg h-8 flex justify-center items-center ${state?.assignee_status === 'Pending' && 'w-[78px]  bg-[#FFC60029]'} ${state?.assignee_status === 'accepted' && ' w-[99px] bg-[#ECFDF5]'} ${state?.assignee_status === 'Cancelled' && 'w-[92px] bg-[#FFF1F2]'} `}>
                    <p className={`text-sm font-Mont text-left ${state?.assignee_status === 'Pending' && 'text-[#FFC600]'} ${state?.assignee_status === 'accepted' && 'text-[#10B981]'} ${state?.assignee_status === 'Cancelled' && 'text-[#F43F5E]'} `}>
                        {state?.assignee_status === "accepted" ? "Accepted" : state?.assignee_status === "Pending" ? "Pending" : "Rejected"}
                    </p>
                </div>
                <button 
                    type='button'
                    className={`${state?.assignee_status === "accepted" ? "hidden" : "w-[159px] h-[38px] bg-[#000] text-center text-[#fff] rounded"}`}
                    onClick={() => setOpenAssignOrder(true)}
                >
                    Assign Order
                </button>
            </div>
            <div className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 16H21C21.5523 16 22 15.5523 22 15V9C22 8.44772 21.5523 8 21 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H6" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H18V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V12Z" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V8H6V4Z" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className='text-[#5C6F7F] font-Mont'>Print Customer Information</p>
            </div>
        </div>

        <div className='flex items-center gap-[32px] mt-[44px]'>
            <p 
                onClick={() => handleChangeTab("Details")} 
                className={`${activeTab === "Details" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[57px] h-[38px]`}
            >
                Details
            </p>
            <p 
                onClick={() => handleChangeTab("Invoice")} 
                className={`${activeTab === "Invoice" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[108px] h-[38px]`}
            >
                Invoices
            </p>
        </div>
        <hr />

        {activeTab === "Details" && <Details state={state} />}
        {activeTab === "Invoice" && <Invoices />}

        <ModalPop isOpen={openAssignOrder}>
            <AssignOrder handleClose={() => setOpenAssignOrder(false)} state={state} />
        </ModalPop>

        <ModalPop isOpen={openOrderComplete}>
            <OrderComplete handleClose={() => setOpenOrderComplete(false)} state={state} />
        </ModalPop>

        <ModalPop isOpen={openDeliveredOrder}>
            <DeliveredOrder handleClose={() => setOpenDeliveredOrder(false)} state={state}/>
        </ModalPop>

    </div>
  )
}

export default OrderDetails