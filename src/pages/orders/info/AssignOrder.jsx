import React, { useState } from 'react'
import Info from "../../../assets/svg/info.svg"
import { CgSpinner } from 'react-icons/cg'
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { toast } from 'react-toastify';

const AssignOrder = ({ handleClose, state }) => {
    const [loading, setLoading] = useState(false);
    
    console.log(state, "slim")

    const updateOrder = async () => {
        const data = {
            order_id: state?.id,
            status: `${state?.status === "pending" ? "Shipped" : state?.status === "Shipped" ? "Enroute" : state?.status === "Enroute" ? "Delivered" : ""}`
        }
        await api.post(appUrls?.UPDATE_ORDER_URL, data)
        .then((res) => {
            console.log(res, "dambo")
            setLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
        .catch((err) => {
            console.log(err, "err")
            setLoading(false)
            toast("Error", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })

    }

  return (
    <div className='w-[426px] h-[356px] mt-[150px] pt-[48px] px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[32px] '>Update order ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Update this order to <span className='text-lg font-semibold'>
                    {`${state?.status === "pending" ? "Shipped" : state?.status === "Shipped" ? "Enroute" : state?.status === "Enroute" ? "Delivered" : ""}`}
                </span> 
            </p>
            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, Update,  this order will be automatically Updated
                </p>
            </div>
            <div className='flex items-center gap-[18px]'>
                <button
                    type='button'
                    className='w-[180px] h-[48px] bg-[#fff] border border-[#5C6F7F] rounded'
                    onClick={handleClose}
                >
                    <p className='font-Dm font-medium text-base'>Cancel</p>
                </button>
                <button
                    type='button'
                    className='w-[180px] h-[48px] bg-[#50724D] text-center flex items-center justify-center rounded'
                    onClick={() => updateOrder()}
                >
                    <p className='text-[#fff] font-Dm font-medium text-base'>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Yes, Update"}</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AssignOrder