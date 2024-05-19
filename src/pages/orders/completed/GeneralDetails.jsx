import React, { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'

const GeneralDetails = ({ state }) => {
    const [userDetails, setUserDetails] = useState([])

    console.log(state, "sttae")
    console.log(userDetails, "userDetails")

    const getUserDetails = async () => {
        await api.get(`${appUrls?.GET_CUSTOMER_URL_BY_ID}/${state?.user_id}`)
        .then((res) => {
            console.log(res, "apake")
            setUserDetails(res?.data?.data?.user)
        })
        .catch((err) => {
            console.log(err, "falz")
        })
    }

    useEffect(() => {
        getUserDetails()
    }, []);

  return (
    <div className='p-8'>
        <div className='flex flex-wrap w-[921px] bg-[#fff] p-8 gap-[40px]'>
            <div className='flex flex-col gap-2  w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>CUSTOMER NAME</p>
                <p className='text-[#071827] font-Mont text-sm'>{userDetails?.full_name}</p>
            </div>
            <div className='flex flex-col gap-2  w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>CUSTOMER PHONE NUMBER</p>
                <p className='text-[#071827] font-Mont text-sm'>{userDetails?.phone_number}</p>
            </div>
            <div className='flex flex-col gap-2 w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>DROP-OFF</p>
                <p className='text-[#071827] font-Mont text-sm'>{state?.address}</p>
            </div>
            <div className='flex flex-col gap-2 w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>PAYMENT TYPE</p>
                <p className='text-[#071827] font-Mont text-sm'>N/A</p> {/* Payment on delivery */}
            </div>
            <div className='flex flex-col gap-2 w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>DATE OF ORDER</p>
                <p className='text-[#071827] font-Mont text-sm'>{new Date(state?.created_at).toDateString()}</p>
            </div>
            <div className='flex flex-col gap-2 w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>DELIVERY DATE</p>
                <p className='text-[#071827] font-Mont text-sm'>N/A</p> {/* 31.09.2021, 3:52PM */}
            </div>
            <div className='flex flex-col gap-2 w-[184px]'>
                <p className='font-Mont text-xs text-[#5C6F7F] font-bold'>VENDOR</p>
                <p className='text-[#071827] font-Mont text-sm'>{userDetails?.business_name}</p>
            </div>

        </div>
    </div>
  )
}

export default GeneralDetails