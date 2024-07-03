import React, { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

import InfoImg from "../../../assets/svg/info.svg"
import Check from "../../../assets/svg/check.svg"

import { appUrls } from '../../../services/urls'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const Details = ({ itemDetails }) => {

  console.log(itemDetails, "itemDetails")

  const refundOrder = async (id) => {
    await api.post(`${appUrls?.REFUND_ORDER_URL}/${id}`)
    .then((res) => {
        console.log(res, "worry")
        toast("Refund Processing", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
        })
    })
    .catch((err) => {
        console.log(err, "No")
        toast("Error", {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
        })
    })
  }

  return (
    <div className='mt-6'>
      <div className='flex gap-[28px]'>
        <div className='flex flex-col gap-6'>
          {/* <div className={`${itemDetails?.assignee_status === "accepted" ? "hidden" : 'w-[730px] bg-[#fff] h-[48px] flex items-center border border-[#FF705E] border-l-4 border-b-0 border-t-0 border-r-0 justify-between p-2' }`}>
              <div className='flex items-center gap-2'>
                <img src={InfoImg} alt='info' />
                <p className='font-Mont font-semibold text-[#071827] text-sm'>Order needs attention</p>
              </div>
              <div className='bg-[#BF190E1C] w-[114px] h-[32px] flex items-center justify-center rounded-lg'>
                <p className='font-Dm text-[#BF190E] font-medium text-xs'>Unassigned</p>
              </div>
          </div> */}

          <div className='w-[730px] p-6 rounded bg-[#fff] flex flex-col gap-6'>
            <p className='font-bold text-[#071827] text-base font-Mont'>Order Details</p>
            <div className='flex items-center gap-[45px]'>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER ITEMS</p>
                <p>{itemDetails?.order_items?.length}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER ID</p>
                <p>{`#${itemDetails?.id?.substring(0, 8)}`}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>ORDER VALUE</p>
                <p>{`₦${itemDetails?.total_amount}`}</p>
              </div>
            </div>
            {/* <p>Vendor Details</p> */}
            <div className='flex items-center flex-wrap gap-[45px]'>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>CUSTOMER NAME</p>
                <p>{`${itemDetails?.user?.first_name} ${itemDetails?.user?.last_name}`}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>CUSTOMER PHONE NUMBER</p>
                <p>{itemDetails?.user?.phone}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DROP-OFF</p>
                <p>{itemDetails?.address}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DATE OF ORDER</p>
                <p>{`${new Date(itemDetails?.created_at).toDateString()} ${new Date(itemDetails?.created_at).toLocaleTimeString()}`}</p>
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>TRANSACTION ID</p>
                <p>{itemDetails?.txn_id}</p> 
              </div>
              <div className='flex flex-col gap-1 w-[156px] h-[47px]'>
                <p className='text-[#5C6F7F] font-Mont font-bold text-xs'>DELIVERY FEE</p>
                <p>{itemDetails?.delivery_fee}</p> 
              </div>
            </div>

            <div className='w-[670px] bg-[#F8F8F8] py-6 px-4 mt-4'>
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
                    <div className='w-[27px] p-1.5'>
                      <p className='text-[#8B909A] font-Mont text-[13px] font-medium'>ACTION</p>
                    </div>
                  </div>
                  <hr />
                  {
                    itemDetails?.order_items?.map((item, index) => (
                      <div className='flex flex-col' key={index}>
                        <div className='flex items-center'>
                          <div className='w-[212px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{item?.product?.name}</p>
                          </div>
                          <div className='w-[132px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{item?.product?.unit_price}</p>
                          </div>
                          <div className='w-[83px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>x{item?.quantity}</p>
                          </div>
                          <div className='w-[132px] p-2'>
                            <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{item?.total}</p>
                          </div>
                          <div className='w-[32px] p-2'>
                            <p 
                              onClick={() => refundOrder(item?.order_id)} 
                              className='text-[#EA5455] font-Mont text-[15px] font-medium cursor-pointer'
                            >
                              Refund
                            </p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))
                  }

                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Subtotal</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{itemDetails?.sub_total}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Delivery fee</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{itemDetails?.delivery_fee}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Discount</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>0</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-[212px] p-1'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#8B909A] font-Mont text-[15px] font-medium'>Total</p>
                    </div>
                    <div className='w-[83px] p-2'></div>
                    <div className='w-[132px] p-2'>
                      <p className='text-[#23272E] font-Mont text-[15px] font-medium'>{itemDetails?.total_amount}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#fff] w-[347px] h-[626px] p-6 rounded'>
          <p className='font-Mont font-bold text-base '>Delivery Process</p>
          {/* <div className='pt-6 flex flex-col gap-[7px]'>
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
          </div> */}
          <div className='flex flex-col mt-6'>
            <div className='flex items-center gap-3'>
                <FaCheckCircle className='text-[#02B156] text-[25px]'/>
                <div className='flex flex-col '>
                    <p className='text-[#8D9290] font-medium font-inter text-base'>Processing</p>
                    <p className='text-[#8D9290] text-sm font-inter'>{new Date(itemDetails?.created_at).toDateString()}</p>
                </div>
            </div>
            <div className='w-1 mx-2 h-[80px] bg-[#32475C1F]'></div>
            <div className='flex items-center gap-3'>
                <FaCheckCircle className={`${itemDetails?.status === "Shipped" || itemDetails?.status === "Enroute"  ? "text-[#02B156]" : "text-[#B6B6B6]"} text-[25px]`} />
                <div className='flex flex-col '>
                  <p className='text-[#8D9290] font-medium font-inter text-base'>Shipped</p>
                  <p className='text-[#8D9290] text-sm font-inter'>{new Date(itemDetails?.updated_at).toDateString()}</p>
                </div>
            </div>
            <div className='w-1 mx-2 h-[80px] bg-[#32475C1F]'></div>
            <div className='flex items-center gap-3'>
                <FaCheckCircle className={`${itemDetails?.status === "Enroute" ? "text-[#02B156]" : "text-[#B6B6B6]"} text-[25px]`}/>
                <div className='flex flex-col '>
                  <p className='text-[#8D9290] font-medium font-inter text-base'>Enroute</p>
                  <p className='text-[#8D9290] text-sm font-inter'>{new Date(itemDetails?.updated_at).toDateString()}</p>
                </div>
            </div>
            <div className='w-1 mx-2 h-[80px] bg-[#32475C1F]'></div>
            <div className='flex items-center gap-3'>
                <FaCheckCircle className={`${itemDetails?.status === "Delivered" ? "text-[#02B156]" : "text-[#B6B6B6]"} text-[25px]`} />
                <div className='flex flex-col '>
                  <p className='text-[#8D9290] font-medium font-inter text-base'>Delivered</p>
                  <p className='text-[#8D9290] text-sm font-inter'>{new Date(itemDetails?.updated_at).toDateString()}</p>
                </div>
            </div>
          </div>
          <p className='text-center text-[#5C6F7F] font-Mont font-medium mt-[87px] text-sm'>Online Payment</p>
        </div>

      </div>
    </div>
  )
}

export default Details