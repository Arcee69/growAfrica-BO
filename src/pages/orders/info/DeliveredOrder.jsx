import React from 'react'

const DeliveredOrder = ({ handleClose }) => {
  return (
    <div className='w-[426px] h-[264px] mt-[150px] pt-[48px] px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[28px] '>Delivered Completed ✅</p>
            <p className='font-Mont text-base text-center'>
                Thank you for successfully delivering the goods. Your efforts are appreciated!
            </p>
           
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
                    <p className='text-[#fff] font-Dm font-medium text-base' >Done</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeliveredOrder