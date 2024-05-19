import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, ResponsiveContainer } from 'recharts';
import AllOrders from './components/AllOrders';
import Pending from './components/Pending';
import Completed from './components/Completed';
import Cancelled from './components/Cancelled';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { Skeleton } from '@mui/material';

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All")
  const [allOrders, setAllOrders] = useState([])
  const [allPendingOrders, setAllPendingOrders] = useState([])
  const [allCompletedOrders, setAllCompletedOrders] = useState([])
  const [allCancelledOrders, setAllCancelledOrders] = useState([])
  const [loading, setLoading] = useState(false)

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
  ]

  const getAllOrders = async () => {
    setLoading(true)
    await api.get(appUrls?.GET_ORDER_URL)
    .then((res) => {
      console.log(res, "asap")
      setLoading(false)
      setAllOrders(res?.data?.data?.orders)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err, "faro")
    })
  };

  console.log(allOrders, "allOrders")

  useEffect(() => {
    getAllOrders()
  }, [])

  const getPendingOrders = () => {
    const pendingOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "Shipped") {
          pendingOrders.push(allOrders[i])
        }
    }
    return pendingOrders
  }


  useEffect(() => {
      const pendingOrders = getPendingOrders();
      setAllPendingOrders(pendingOrders)
  }, [allOrders])

  console.log(allPendingOrders, "allPendingOrders");

  const getCompletedOrders = () => {
    const completedOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "Payment Completed") {
          completedOrders.push(allOrders[i])
        }
    }
    return completedOrders
  }


  useEffect(() => {
      const completedOrders = getCompletedOrders();
      setAllCompletedOrders(completedOrders)
  }, [allOrders])

  console.log(allCompletedOrders, "allCompletedOrders");

  const getCancelledOrders = () => {
    const cancelledOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "Cancelled") {
          cancelledOrders.push(allOrders[i])
        }
    }
    return cancelledOrders
  }


  useEffect(() => {
      const cancelledOrders = getCancelledOrders();
      setAllCancelledOrders(cancelledOrders)
  }, [allOrders])

  console.log(allCancelledOrders, "allCancelledOrders");


  return (
    <div className='p-8'>
      <div className='flex items-center justify-between'>
        <p className='text-[24px] text-[#23272E] font-bold'>Order Management</p>
        {/* <div className='bg-[#8CAD07] flex items-center justify-between w-[159px] h-[38px] p-2 rounded'>
          <p className='text-[#fff] font-Mont font-medium'>Create Order</p>
          <FaPlus className='w-4 h-4 text-[#fff]' />
        </div> */}
      </div>
      <div className='mt-[33px] flex items-center gap-[17px]'>
        {
          loading ?
          <Skeleton  variant="rectangular" width={354} height={197} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
          :
          <div>
            <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
              <div className='flex flex-col gap-[29px]'>
                  <div className='flex flex-col gap-1'>
                      <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Orders</p>
                      <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                      <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allOrders?.length}</p>
                      <p>Last 7 days</p>
                  </div>
              </div>
              {/* <ResponsiveContainer>
                  <LineChart width={150} height={50} data={data}
                      margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                  >
                      {/* <CartesianGrid strokeDasharray="3 3" /> */}
                      {/* <XAxis dataKey="name" /> */}
                      {/* <YAxis /> */}
                      {/* <Tooltip /> */}
                      {/* <Legend /> 
                      <Line type="monotone" dataKey="pv" stroke="#D02626" />

                  </LineChart>
              </ResponsiveContainer> */}
            </div>
          </div>
        }
        {
          loading ?
          <Skeleton  variant="rectangular" width={354} height={197} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
          :
          <div>
            <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                <div className='flex flex-col gap-[29px]'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Pending Orders</p>
                        <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allPendingOrders?.length}</p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                {/* <ResponsiveContainer>
                    <LineChart width={150} height={50} data={data}
                        margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        {/* <Tooltip /> */}
                        {/* <Legend /> 
                        <Line type="monotone" dataKey="pv" stroke="#D02626" />

                    </LineChart>
                </ResponsiveContainer> */}
            </div>
          </div>
        }
        {
          loading ?
          <Skeleton  variant="rectangular" width={354} height={197} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
          :
          <div>
            <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                <div className='flex flex-col gap-[29px]'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Completed Orders</p>
                        <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allCompletedOrders?.length}</p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                {/* <ResponsiveContainer>
                    <LineChart width={150} height={50} data={data}
                        margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        {/* <Tooltip /> */}
                        {/* <Legend /> 
                        <Line type="monotone" dataKey="pv" stroke="#D02626" />

                    </LineChart>
                </ResponsiveContainer> */}
            </div>
          </div>
        }


      </div>

      <div className='flex items-center gap-4 mt-[44px]'>
        <p 
          onClick={() => handleChangeTab("All")} 
          className={`${activeTab === "All" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[57px] h-[38px]`}
        >
            All
        </p>
        <p 
          onClick={() => handleChangeTab("Pending")} 
          className={`${activeTab === "Pending" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[70px] h-[38px]`}
        >
          Pending
        </p>
        <p 
          onClick={() => handleChangeTab("Completed")} 
          className={`${activeTab === "Completed" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[78px] h-[38px]`}
        >
          Completed
        </p>
        <p 
          onClick={() => handleChangeTab("Cancelled")} 
          className={`${activeTab === "Cancelled" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[99px] h-[38px]`}
        >
          Cancelled
        </p>
      </div>
      <hr />

      {activeTab === "All" && <AllOrders allOrders={allOrders} loading={loading}/>}
      {activeTab === "Pending" && <Pending allPendingOrders={allPendingOrders} loading={loading}/>}
      {activeTab === "Completed" && <Completed allCompletedOrders={allCompletedOrders} loading={loading} />}
      {activeTab === "Cancelled" && <Cancelled allCancelledOrders={allCancelledOrders} loading={loading} />}

    </div>
  )
}

export default Orders