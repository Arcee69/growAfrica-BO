import React from 'react'

const Details = ({ info }) => {

    console.log(info, 'apostle')

  return (
    <div className='bg-[#fff] flex flex-col gap-6 p-6 mt-[66px]'>
        <div className='flex flex-col gap-6'>
            <p className='text-[#071827] font-Mont text-base font-bold'>Customer Details</p>
            <div className='flex items-center gap-[85px]'>
                <div className='flex flex-col gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>Customer name</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.full_name || "N/A"}</p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>Customer id</p>
                    <p className='text-[#071827] font-Mont text-sm'>{`#${info?.id?.substring(0, 8)}` || "N/A"}</p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>email address</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.email || "N/A"}</p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>Phone number</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.phone_number || "N/A"}</p>
                </div>

            </div>

        </div>

        <div className='flex flex-col gap-3'>
            <p className='text-[#071827] font-Mont text-base font-bold'>Business Details</p>
            <div className='flex  gap-6'>
                <div className='flex flex-col w-[170px] gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>Business name</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.business_name || "N/A"}</p>
                </div>
                <div className='flex flex-col w-[203px] gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'> Business phone number</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.phone_number || "N/A"}</p>
                </div>
                <div className='flex flex-col gap-1.5 w-[184px]'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'> Business address</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.business_address || "N/A"}</p>
                </div>
            </div>
            <div className='flex items-center gap-10'>
                <div className='flex flex-col w-[156px] gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'> business email</p>
                    <p className='text-[#071827] font-Mont text-sm'>{info?.business_mail || "N/A"}</p>
                </div>
                <div className='flex flex-col w-[156px]  gap-1.5'>
                    <p className='uppercase text-[#5C6F7F] font-bold text-xs'>  Date created</p>
                    <p className='text-[#071827] font-Mont text-sm'>{new Date(info?.created_at).toLocaleString()}</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Details