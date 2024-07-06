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
import EnrouteOrders from './components/EnrouteOrders';

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All")
  const [allOrders, setAllOrders] = useState([])
  const [allPendingOrders, setAllPendingOrders] = useState([])
  const [allEnrouteOrders, setAllEnrouteOrders] = useState([])
  const [allCompletedOrders, setAllCompletedOrders] = useState([])
  const [allReturnedOrders, setAllReturnedOrders] = useState([])
  const [loading, setLoading] = useState(false)

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }


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
        if(allOrders[i]?.status === "pending") {
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

  const getEnrouteOrders = () => {
    const enrouteOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "Enroute") {
          enrouteOrders.push(allOrders[i])
        }
    }
    return enrouteOrders
  }


  useEffect(() => {
      const enrouteOrders = getEnrouteOrders();
      setAllEnrouteOrders(enrouteOrders)
  }, [allOrders])

  const getCompletedOrders = () => {
    const completedOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "Delivered") {
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

  const getReturnedOrders = () => {
    const returnedOrders = []
    for (let i = 0; i < allOrders?.length; i++) {
        console.log(allOrders[i])
        if(allOrders[i]?.status === "returned") {
          returnedOrders.push(allOrders[i])
        }
    }
    return returnedOrders
  }


  useEffect(() => {
      const returnedOrders = getReturnedOrders();
      setAllReturnedOrders(returnedOrders)
  }, [allOrders])

  console.log(allReturnedOrders, "allReturnedOrders");


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
                      {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                  </div>
                  <div className='flex flex-col gap-1'>
                      <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allOrders?.length}</p>
                      {/* <p>Last 7 days</p> */}
                  </div>
              </div>
          
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
                        {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allPendingOrders?.length}</p>
                        {/* <p>Last 7 days</p> */}
                    </div>
                </div>
     
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
                        {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allCompletedOrders?.length}</p>
                        {/* <p>Last 7 days</p> */}
                    </div>
                </div>
        
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
          Processing
        </p>
        <p 
          onClick={() => handleChangeTab("Enroute")} 
          className={`${activeTab === "Enroute" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[70px] h-[38px]`}
        >
          Enroute
        </p>
        <p 
          onClick={() => handleChangeTab("Returned")} 
          className={`${activeTab === "Returned" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[99px] h-[38px]`}
        >
          Returned
        </p>
        <p 
          onClick={() => handleChangeTab("Completed")} 
          className={`${activeTab === "Completed" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[78px] h-[38px]`}
        >
          Completed
        </p>
       
      </div>
      <hr />

      {activeTab === "All" && <AllOrders allOrders={allOrders} loading={loading}/>}
      {activeTab === "Pending" && <Pending allPendingOrders={allPendingOrders} loading={loading}/>}
      {activeTab === "Enroute" && <EnrouteOrders allEnrouteOrders={allEnrouteOrders} loading={loading}/>}
      {activeTab === "Completed" && <Completed allCompletedOrders={allCompletedOrders} loading={loading} />}
      {activeTab === "Returned" && <Cancelled allReturnedOrders={allReturnedOrders} loading={loading} />}

    </div>
  )
}

export default Orders