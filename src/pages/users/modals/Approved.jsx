import React, { useState } from 'react'
import Info from "../../../assets/svg/info.svg"
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'


const Approved = ({ handleClose, approveData, userActionLoading, setUserActionLoading }) => {


    const activateUser = async () => {
        setUserActionLoading(true)
        
        await api.post(`${appUrls?.ACTIVATE_USER_URL}/${approveData?.id}`)
        .then((res) => {
            console.log(res, "dambo")
            setUserActionLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
        .catch((err) => {
            console.log(err, "err")
            setUserActionLoading(false)
            toast("Error", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }

  return (
    <div className='w-[426px] h-[306px] mt-[100px] pt-[48px] px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-6'>
            <p className='font-Mont font-bold text-[32px] '>Activate User ⏳</p>
        
            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, Activate,  this user will be Activated
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
                    onClick={() => activateUser()}
                >
                    <p className='text-[#fff] font-Dm font-medium text-base' >{userActionLoading ? <CgSpinner className='animate-spin text-lg'/> : " Yes, Activate"}</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Approved