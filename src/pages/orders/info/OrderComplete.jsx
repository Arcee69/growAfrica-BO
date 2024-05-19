import React from 'react'
import Info from "../../../assets/svg/info.svg"

const OrderComplete = ({ handleClose }) => {
  return (
    <div className='w-[426px] h-[356px] mt-[150px] pt-[48px] px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[32px] '>Order Complete ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Mark this Order as complete?
            </p>
            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, order will be moved automatically to Order Delivered 
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
                    className='w-[180px] h-[48px] bg-[#50724D] text-center rounded'
                >
                    <p className='text-[#fff] font-Dm font-medium text-base' >Yes, Mark it</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default OrderComplete