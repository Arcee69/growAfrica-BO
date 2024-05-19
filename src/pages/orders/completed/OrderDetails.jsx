import React, { useState, useEffect } from 'react'
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'

const OrderDetails = ({ state }) => {
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

  return (
    <div className='p-8 flex items-start gap-10 '>
        <div className='w-[730px] p-6 bg-[#fff] rounded flex flex-col gap-6'>
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

                    {
                      state?.order_items?.map((item, index) => (
                        <div className='flex items-center' key={index}>
                          <div className='w-[212px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{item?.product?.name}</p>
                          </div>
                          <div className='w-[132px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{`₦${item?.product?.unit_price}`}</p>
                          </div>
                          <div className='w-[83px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{`x${item?.quantity}`}</p>
                          </div>
                          <div className='w-[132px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{`₦${item?.product?.unit_price * item?.quantity}`}</p>
                          </div>
                        </div>

                      ))
                    }
                    <hr />

                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Subtotal</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>Nil</p> {/* $4,896.51 */}
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Shipping</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>Nil </p> {/* $5.50 */}
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Discount</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#EA5455] font-Mont text-[15px] font-medium'>Nil</p> {/* $150.32*/}
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Total</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{`₦${state?.total_amount}`}</p>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 16H21C21.5523 16 22 15.5523 22 15V9C22 8.44772 21.5523 8 21 8H3C2.44772 8 2 8.44772 2 9V15C2 15.5523 2.44772 16 3 16H6" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 12H18V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V12Z" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V8H6V4Z" stroke="#5C6F7F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='text-[#50724D] font-Mont'>Print Order Invoice</p>
        </div>
    </div>
  )
}

export default OrderDetails