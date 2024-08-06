import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, ResponsiveContainer } from 'recharts';


import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { Skeleton } from '@mui/material';
import AllAdmins from './components/AllAdmins';
import Sellers from './components/Sellers';
import Buyers from './components/Buyers';
import { FaPlus } from 'react-icons/fa6';
import ModalPop from '../../components/modalPop';
import AddAdmin from './modals/AddAdmin';

const Users = () => {
    const [activeTab, setActiveTab] = useState("Admins");
    const [allAdmins, setAllAdmins] = useState([])
    const [allSellers, setAllSellers] = useState([])
    const [allBuyers, setAllBuyers] = useState([])
    const [loading, setLoading] = useState(false)
    const [userActionLoading, setUserActionLoading] = useState(false)
    const [addAdminLoading, setAddAdminLoading] = useState(false)
    const [openAddAdmin, setOpenAddAdmin] = useState(false)

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    const getAllAdmins = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_ADMIN_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setAllAdmins(res?.data?.data?.admins)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    useEffect(() => {
        getAllAdmins()
    }, [userActionLoading, addAdminLoading])


    const getAllBuyers = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_BUYERS_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setAllBuyers(res?.data?.data?.buyers)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    useEffect(() => {
        getAllBuyers()
    }, [userActionLoading])

    const getAllSellers = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_SELLERS_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setAllSellers(res?.data?.data?.sellers)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    useEffect(() => {
        getAllSellers()
    }, [userActionLoading])

    const approvedSellers = allSellers?.filter(item => item.kyc_status === 'approved');


    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 2500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                // dots: true,
              }
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 320,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                // dots: true
              }
            }
          ]
      };

     


    
  return (
    <div className='p-8'>
        <div className='flex items-center justify-between'>
            <p className='text-[24px] text-[#23272E] font-bold'>Users Management</p>
            <div onClick={() => setOpenAddAdmin(true)} className='bg-[#27AE60] flex items-center justify-between w-[159px] h-[48px] p-2 rounded'>
                <p className='text-[#fff] font-Mont font-medium'>Create Admin</p>
                <FaPlus className='w-4 h-4 text-[#fff]' />
            </div>
      </div>
        

        <div className='mt-[33px]' style={{ width: "100%" }}>
            <Slider {...settings}>
                {
                    loading ?
                    <Skeleton  variant="rectangular" width={354} height={197} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
                    :
                    <div>
                        <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                            <div className='flex flex-col gap-[29px]'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Admins</p>
                                    {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allAdmins?.length}</p>
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
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Sellers</p>
                                    {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allSellers?.length}</p>
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
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Approved Sellers</p>
                                    {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{approvedSellers?.length}</p>
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
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Buyers</p>
                                    {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allBuyers?.length}</p>
                                    {/* <p>Last 7 days</p> */}
                                </div>
                            </div>
    
                        </div>
                    </div>
                }
            </Slider>
        </div>

        <div className='flex items-center gap-5 mt-[44px]'>
            <p 
                onClick={() => handleChangeTab("Admins")} 
                className={`${activeTab === "Admins" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer p-1 border border-[#27AE60] w-[87px] h-[38px]`}
            >
                Admins
            </p>
            <p 
                onClick={() => handleChangeTab("Sellers")} 
                className={`${activeTab === "Sellers" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer p-1 border border-[#27AE60] w-[78px] h-[38px]`}
            >
                Sellers
            </p>
            <p 
                onClick={() => handleChangeTab("Buyers")} 
                className={`${activeTab === "Buyers" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer p-1 border border-[#27AE60] w-[99px] h-[38px]`}
            >
                Buyers
            </p>
        </div>
        <hr />

        {activeTab === "Admins" && <AllAdmins allAdmins={allAdmins} loading={loading} userActionLoading={userActionLoading} setUserActionLoading={setUserActionLoading} />}
        {activeTab === "Sellers" && <Sellers allSellers={allSellers} loading={loading} userActionLoading={userActionLoading} setUserActionLoading={setUserActionLoading}  />}
        {activeTab === "Buyers" && <Buyers allBuyers={allBuyers} loading={loading}  />}


        <ModalPop isOpen={openAddAdmin}>
            <AddAdmin 
                handleClose={() => setOpenAddAdmin(false)} 
                setAddAdminLoading={setAddAdminLoading}
                addAdminLoading={addAdminLoading}
            />
        </ModalPop>

    </div>
  )
}

export default Users