import React, { useState, useEffect } from 'react'

import InfoImg from "../../../assets/svg/info.svg"
import Check from "../../../assets/svg/check.svg"

import { appUrls } from '../../../services/urls'
import { api } from '../../../services/api'

const Details = ({ state }) => {
  const [userDetails, setUserDetails] = useState([])

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

  const data = [
    {
      title: "Order Placed",
      time: "31.09.2021, 3:52PM"
    },
    {
      title: "Order has been Assigned",
      time: "31.09.2021, 3:52PM"
    },
    {
      title: "Order has been  accepted",
      time: "31.09.2021, 3:52PM"
    },
    {
      title: "Shipped",
      time: "31.09.2021, 3:52PM"
    },
    {
      title: "Order Delivered",
      time: "Not yet"
    },
  ]

  console.log(userDetails, "userDetails")
  console.log(state, "pablo")

  return (
    <div className='mt-6'>
      <div className='flex gap-[28px]'>
        <div className='flex flex-col gap-6'>
          <div className={`${state?.assignee_status === "accepted" ? "hidden" : 'w-[730px] bg-[#fff] h-[48px] flex items-center border border-[#FF705E] border-l-4 border-b-0 border-t-0 border-r-0 justify-between p-2' }`}>
              <div className='flex items-center gap-2'>
                <img src={InfoImg} alt='info' />
                <p className='font-Mont font-semibold text-[#071827] text-sm'>Order needs attention</p>
              </div>
              <div className='bg-[#BF190E1C] w-[114px] h-[32px] flex items-center justify-center rounded-lg'>
                <p className='font-Dm text-[#BF190E] font-medium text-xs'>Unassigned</p>
              </div>
          </div>

          <div className='w-[730px] p-6 rounded bg-[#fff] flex flex-col gap-6'>
            <p className='font-bold text-[#071827] text-base font-Mont'>Order Details</p>
            <div className='flex items-center gap-[45px]'>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER TYPE</p>
                <p>{userDetails?.type}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER ID</p>
                <p>{`#${state?.id?.substring(0, 8)}`}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER VALUE</p>
                <p>{`₦${state?.total_amount}`}</p>
              </div>
            </div>
            <p>Vendor Details</p>
            <div className='flex items-center flex-wrap gap-[45px]'>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>CUSTOMER NAME</p>
                <p>{userDetails?.full_name}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>CUSTOMER PHONE NUMBER</p>
                <p>{userDetails?.phone_number}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DROP-OFF</p>
                <p>{state?.address}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DATE OF ORDER</p>
                <p>{`${new Date(state?.created_at).toLocaleString().slice(0, 15)} AM`}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DELIVERY DATE</p>
                <p>Nil</p> {/* 31.09.2021, 3:52PM */}
              </div>
            </div>

            <div className='w-[670px] bg-[#F8F8F8] py-6 px-4'>
              <p className='font-Mont font-bold text-[#5C6F7F] text-xs'>Order List</p>
              <div className='p-2 flex flex-col'>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1.5'>
                      <p className='text-[#8B909A] font-Mont text-[13px] font-medium'>NAME</p>
                    </div>
                    <div className='w-[127px] p-1.5'>
                      <p className='text-[#8B909A] font-Mont text-[13px] font-medium'>PRICE</p>
                    </div>
                    <div className='w-[92px] p-1.5'>
                      <p className='text-[#8B909A] font-Mont text-[13px] font-medium'>QTY</p>
                    </div>
                    <div className='w-[127px] p-1.5'>
                      <p className='text-[#8B909A] font-Mont text-[13px] font-medium'>TOTAL</p>
                    </div>
                  </div>
                  <hr />
                  <div className='flex items-center'>
                    <div className='w-[212px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>Relaxer</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$999.29</p>
                    </div>
                    <div className='w-[83px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>x1</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$949.32</p>
                    </div>
                  </div>
                  <hr />
                  <div className='flex items-center'>
                    <div className='w-[212px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>Leave-in Conditioner</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$999.29</p>
                    </div>
                    <div className='w-[83px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>x1</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$949.32</p>
                    </div>
                  </div>
                  <hr />
                  <div className='flex items-center'>
                    <div className='w-[212px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>Body scrub</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$999.29</p>
                    </div>
                    <div className='w-[83px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>x3</p>
                    </div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$2,997.87</p>
                    </div>
                  </div>
                  <hr />
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Subtotal</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$4,896.51</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Shipping</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$5.50</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Discount</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#EA5455] font-Mont text-[15px] font-medium'>$150.32</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Total</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>$4,751.69</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#fff] w-[347px] h-[626px] p-6 rounded'>
          <p className='font-Mont font-bold text-base '>Delivery Process</p>
          <div className='pt-6 flex flex-col gap-[7px]'>
            {data?.map((d, index) => (
              <div key={index} className='flex gap-[11px]'>
                <div className='flex flex-col gap-[5px] items-center'>
                  <img src={Check} alt='check' className='w-[24px] h-[24px]'/>
                  {index !== (data?.length - 1) && <div className='h-[31px] w-[1px] bg-[#000]'></div>}
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[#000] font-Mont text-sm'>{d?.title}</p>
                  <p className='text-sm text-[#5C6F7F] font-Mont'>{d?.time}</p>
                </div>
              </div>
            ))}
          </div>
          <p className='text-center text-[#5C6F7F] font-Mont font-medium mt-[157px] text-sm'>Online Payment</p>
        </div>

      </div>
    </div>
  )
}

export default Details