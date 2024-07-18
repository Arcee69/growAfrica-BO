import React, { useState } from 'react'

import CloseIcon from "../../../assets/svg/closeIcon.svg"
import { appUrls } from '../../../services/urls'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'
import { api } from '../../../services/api'

const Details = ({ handleClose, detailsData, userActionLoading, setUserActionLoading }) => {
    const [text, setText] = useState("")
    const [error, setError] = useState("")

    const submitForm = async (value) => {
        if(value === "rejected" && text === "") {
            setError("Reason is required")
        } else {
            setUserActionLoading(true)
            const data = {
                "status": value,
                "reason": text
            }
            await api.post(appUrls?.UPDATE_KYC_STATUS_URL + `/${detailsData?.id}`, data)
            .then((res) => {
                console.log(res, "slam")
                setUserActionLoading(false)
                toast.success(`${res?.data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleClose()
            })
            .catch((err) => {
                console.log(err, "zana")
                setUserActionLoading(false)
                toast.error(`${err?.data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                handleClose()
            })
        }
    } 

    console.log(detailsData, "detailsData")
  return (
    <div className='bg-[#fff] w-full lg:w-[600px] mt-[50px] h-[500px] overflow-y-scroll px-5 rounded-lg py-[40px] flex flex-col  gap-4'>
        <div className='flex justify-between mb-4'>
            <p className='text-[#000] text-lg font-Hat'>Kyc Details</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='flex flex-col gap-5'>
            <img src={detailsData?.id_doc} alt='thumbnail' className='w-[300px] h-[300px] mx-auto' />
            <div className='flex flex-col gap-3'>
                <p className='text-[#000] text-lg font-mont font-semibold'>Sellers Name: <span className='text-sm font-poppins font-medium'>{`${detailsData?.first_name} ${detailsData?.last_name}`}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Business Name: <span className='text-sm font-poppins font-medium'>{detailsData?.business_name}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Business City: <span className='text-sm font-poppins font-medium'>{detailsData?.business_city}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Business State: <span className='text-sm font-poppins font-medium'>{detailsData?.business_state}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Phone: <span className='text-sm font-poppins font-medium'>{detailsData?.phone}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Email: <span className='text-sm font-poppins font-medium'>{detailsData?.email}</span></p>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='Rejection'>Reason for Rejection</label>
                <textarea
                    className='w-full border border-[#ccc] outline-none h-[148px] p-2'
                    placeholder='Type Here...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                >
                </textarea>
                {error && <p className='text-[#f00] font-Dm text-sm'>{error}</p>}
            </div>
        </div>
        <div className='flex items-center mt-5 justify-between gap-[18px]'>
            <button
                type='button'
                className='w-[180px] h-[48px]  text-center flex items-center bg-[#f00] justify-center rounded'
                onClick={() => submitForm("rejected")}
            >
                <p className='text-[#fff] font-Dm font-medium text-base' >{userActionLoading ? <CgSpinner className='animate-spin text-lg'/> : " Reject"}</p>
            </button>
            <button
                type='button'
                className='w-[180px] h-[48px] bg-[#27AE60] flex items-center rounded justify-center'
                onClick={() => submitForm("approved")}
            >
                <p className='font-Dm font-medium text-base text-[#fff]'>{userActionLoading ? <CgSpinner className='animate-spin text-lg'/> : "Approve"}</p>
            </button>
        
        </div>

    </div>
  )
}

export default Details