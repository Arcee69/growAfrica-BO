import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, ResponsiveContainer } from 'recharts';
import New from './components/New';
import AllCustomers from './components/AllCustomers';
import Salon from './components/Salon';
import Retailers from './components/Retailers';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { Skeleton } from '@mui/material';

const Customers = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [users, setUsers] = useState([])
    const [allSaloonUsers, setAllSaloonUsers] = useState([])
    const [allRetailUsers, setAllRetailUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    const getAllCustomers = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_CUSTOMER_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setUsers(res?.data?.data?.user)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    console.log(users, "users")

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

   
    const getSalonUsers = () => {
        const salonUsers = []
        for (let i = 0; i < users?.length; i++) {
            console.log(users[i])
            if(users[i]?.type === "saloon") {
                salonUsers.push(users[i])
            }
        }
        return salonUsers
    }


    useEffect(() => {
        const salonUsers = getSalonUsers();
        setAllSaloonUsers(salonUsers)
    }, [users])

    console.log(allSaloonUsers, "allSaloonUsers");


    const getRetailUsers = () => {
        const retailUsers = []
        for (let i = 0; i < users?.length; i++) {
            console.log(users[i])
            if(users[i]?.type === "retailer") {
                retailUsers.push(users[i])
            }
        }
        return retailUsers
    }


    useEffect(() => {
        const retailUsers = getRetailUsers();
        setAllRetailUsers(retailUsers)
    }, [users])

    console.log(allRetailUsers, "allRetailUsers");
    
  return (
    <div className='p-8'>
        <p className='text-[24px] text-[#23272E] font-bold'>Customer Management</p>

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
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Customers</p>
                                    <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{users?.length}</p>
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

                {/* <div>
                    <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                        <div className='flex flex-col gap-[29px]'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>New Customers</p>
                                <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-[#23272E] font-Hat font-bold text-[31px]'>10</p>
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
                        </ResponsiveContainer> 
                    </div>
                </div> */}

                {
                    loading ?
                    <Skeleton  variant="rectangular" width={354} height={197} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
                    :
                    <div>
                        <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                            <div className='flex flex-col gap-[29px]'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Salons</p>
                                    <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allSaloonUsers?.length}</p>
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
                                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Retailers</p>
                                    <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allRetailUsers?.length}</p>
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


            </Slider>
        </div>

        <div className='flex items-center mt-[44px]'>
            <p 
                onClick={() => handleChangeTab("All")} 
                className={`${activeTab === "All" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[57px] h-[38px]`}
            >
                All
            </p>
            {/* <p 
                onClick={() => handleChangeTab("New")} 
                className={`${activeTab === "New" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[70px] h-[38px]`}
            >
                New
            </p> */}
            <p 
                onClick={() => handleChangeTab("Salon")} 
                className={`${activeTab === "Salon" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[78px] h-[38px]`}
            >
                Salon
            </p>
            <p 
                onClick={() => handleChangeTab("Retailers")} 
                className={`${activeTab === "Retailers" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[99px] h-[38px]`}
            >
                Retailers
            </p>
        </div>
        <hr />

        {activeTab === "All" && <AllCustomers users={users} loading={loading} />}
        {/* {activeTab === "New" && <New />} */}
        {activeTab === "Salon" && <Salon allSaloonUsers={allSaloonUsers} loading={loading} />}
        {activeTab === "Retailers" && <Retailers allRetailUsers={allRetailUsers} loading={loading}  />}

    </div>
  )
}

export default Customers