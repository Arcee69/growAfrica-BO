import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { appUrls } from '../../services/urls'
import { api } from '../../services/api'
import AllKycs from './component/AllKycs'
import Slider from 'react-slick'

const KYC = () => {
    const [loading, setLoading] = useState(false)
    const [allKyc, setAllKyc] = useState([])
    const [allPendingKyc, setAllPendingKyc] = useState([])
    const [allRejectedKyc, setAllRejectedKyc] = useState([])
    const [allApprovedKyc, setAllApprovedKyc] = useState([])
    const [activeTab, setActiveTab] = useState("All");
    const [userActionLoading, setUserActionLoading] = useState(false)
   

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    const getAllKyc = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_ALL_KYC_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setAllKyc(res?.data?.data?.users)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    const getAllPendingKyc = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_ALL_PENDING_KYC_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "bia")
            setAllPendingKyc(res?.data?.data?.users)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    const getAllRejectedKyc = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_ALL_REJECTED_KYC_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "bia")
            setAllRejectedKyc(res?.data?.data?.users)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    const getAllApprovedKyc = async () => {
        setLoading(true)
        await api.get(appUrls?.GET_ALL_APPROVED_KYC_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "bia")
            setAllApprovedKyc(res?.data?.data?.users)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }


    useEffect(() => {
        getAllKyc()
        getAllPendingKyc()
        getAllRejectedKyc()
        getAllApprovedKyc()
    }, [userActionLoading])

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
            <p className='text-[24px] text-[#23272E] font-bold'>KYC</p>
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
                        <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Applied Kyc</p>
                        {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allKyc?.length}</p>
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
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Pending Kyc</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                    
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allPendingKyc?.length}</p>
                            {/*<p>Last 7 days</p>  */}
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
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Approved Kyc</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                    
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allApprovedKyc?.length}</p>
                            {/*<p>Last 7 days</p>  */}
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
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Rejected Kyc</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                    
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allRejectedKyc?.length}</p>
                            {/*<p>Last 7 days</p>  */}
                        </div>
                    
                    </div>
        
                </div>
            </div>
            }
        


        </Slider>
      </div>

        <div className='flex items-center gap-5 mt-[44px]'>
            <p 
                onClick={() => handleChangeTab("All")} 
                className={`${activeTab === "All" ? "text-[#27AE60] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer p-1 border border-[#27AE60] w-[87px] h-[38px]`}
            >
                All
            </p>
    
        </div>
        <hr />
        {activeTab === "All" && <AllKycs allKyc={allKyc} loading={loading} userActionLoading={userActionLoading} setUserActionLoading={setUserActionLoading} />}
    </div>
  )
}

export default KYC