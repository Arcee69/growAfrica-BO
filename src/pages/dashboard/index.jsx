import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import {LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from "react-apexcharts";

import Dollar from "../../assets/png/dollar.png"
import ChartImg from "../../assets/png/chart.png"
import User from "../../assets/png/user_total.png"
import Empty from "../../assets/png/empty.png"
import ArrowUp from "../../assets/png/arrow_up.png"
import ArrowDown from "../../assets/png/arrow_down.png"

import Calendar from "../../assets/svg/calendar.svg"
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { Skeleton } from '@mui/material';


const Dashboard = () => {
  const [loadingAnalyticsData, setLoadingAnalyticsData] = useState(false);
  const [loadingTransactionData, setLoadingTransactionData] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allOrdersLoading, setAllOrdersLoading] = useState([])


  const fetchAnalytics = async () => {
    setLoadingAnalyticsData(true)
    await api.get(`${appUrls?.FETCH_ANALYTICS_URL}`)
    .then((res) => {
      console.log(res, "analytics")
      setLoadingAnalyticsData(false);
      setAnalyticsData(res?.data?.data)
    })
    .catch((err) => {
      setLoadingAnalyticsData(false)
      console.log(err, "faro")
    })
  }

  const fetchTransactions = async () => {
    setLoadingAnalyticsData(true)
    await api.get(`${appUrls?.FETCH_TRANSACTION_URL}`)
    .then((res) => {
      console.log(res, "transactions")
      setLoadingAnalyticsData(false);
      setTransactionData(res?.data?.data?.transactions)
    })
    .catch((err) => {
      setLoadingAnalyticsData(false)
      console.log(err, "faro")
    })
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const data = {
    series: [analyticsData?.saloon_sales, analyticsData?.retailer_sales, ],
    options: {
        chart: {
          type: 'donut',
        },
        labels: [ " Salon", " Retailer"],
        colors:[  '#FFD240', "#50724D", ],
        dataLabels: {
          enabled: false,
        },
        responsive: [{
          breakpoint: 780,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            },
          }
        }],
        legend: {
          show: true,
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: function(value, { seriesIndex, dataPointIndex, w }) {
              const label = `${data.options.labels[dataPointIndex][0]} ${value}%`;
              return label;
            }
          }
        }
      },
    };

    const chartdata = [
      {
        "name": "Mon",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
      },
      {
        "name": "Tue",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
      },
      {
        "name": "Wed",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
      },
      {
        "name": "Thur",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
      },
      {
        "name": "Fri",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
      },
      {
        "name": "Sat",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
      },
      {
        "name": "Sun",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
      }
    ];


    const ordersData = [
      {
        id: 1,
        name: "Regina Cooper",
        no: "#790841",
        amount: "$2.500",
        paymentType: "Credit Card",
        Date: "12.09.2019"
      },
      {
        id: 2,
        name: "Regina Cooper",
        no: "#790841",
        amount: "$2.500",
        paymentType: "Credit Card",
        Date: "12.09.2019"
      },
      {
        id: 3,
        name: "Regina Cooper",
        no: "#790841",
        amount: "$2.500",
        paymentType: "Credit Card",
        Date: "12.09.2019"
      },
      {
        id: 4,
        name: "Regina Cooper",
        no: "#790841",
        amount: "$2.500",
        paymentType: "Credit Card",
        Date: "12.09.2019"
      },
    ];

    // const transactionData = [
    //   {
    //     id: 1,
    //     name: "Devon Williamson",
    //     date: "08:00 AM  —  19 August",
    //     amount: "+$1.400",
    //     type: "Payment"
    //   },
    //   {
    //     id: 2,
    //     name: "Debra Wilson",
    //     date: "08:00 AM  —  19 August",
    //     amount: "-$850",
    //     type: "Refund"
    //   },
    //   {
    //     id: 3,
    //     name: "Judith Black",
    //     date: "08:00 AM  —  19 August",
    //     amount: "+$1.400",
    //     type: "Payment"
    //   },
    //   {
    //     id: 4,
    //     name: "Philip Henry",
    //     date: "08:00 AM  —  19 August",
    //     amount: "+$1.400",
    //     type: "Payment"
    //   },
    //   {
    //     id: 5,
    //     name: "Mitchell Cooper",
    //     date: "08:00 AM  —  19 August",
    //     amount: "+$1.400",
    //     type: "Payment"
    //   },
    // ]

    const getAllOrders = async () => {
      setAllOrdersLoading(true)
      await api.get(appUrls?.GET_ORDER_URL)
      .then((res) => {
        console.log(res, "asap")
        setAllOrdersLoading(false)
        setAllOrders(res?.data?.data?.orders)
      })
      .catch((err) => {
        setAllOrdersLoading(false)
        console.log(err, "faro")
      })
    };
  
    console.log(allOrders, "allOrders")
  
    useEffect(() => {
      getAllOrders()
    }, [])
    

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between'>
        <p className='font-Hat font-medium text-[28px] text-[#3F434A]'>Overview</p>
        <div className='flex items-center gap-4'>
            <div className='w-[40px] h-[40px] bg-[#fff] flex items-center justify-center rounded-lg p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8989 7.75503C11.1994 7.48146 11.6647 7.50325 11.9383 7.8037C12.2118 8.10415 12.1901 8.56948 11.8896 8.84306L7.99852 12.3861L4.10744 8.84306C3.80699 8.56948 3.7852 8.10415 4.05877 7.8037C4.33235 7.50325 4.79768 7.48146 5.09813 7.75503L7.26278 9.72604V0.735742C7.26278 0.329402 7.59218 0 7.99852 0C8.40486 0 8.73426 0.329402 8.73426 0.735742V9.72604L10.8989 7.75503ZM1.45455 12.3633C1.45455 11.9617 1.12893 11.6361 0.727273 11.6361C0.325611 11.6361 0 11.9617 0 12.3633V13.333C0 14.8058 1.19391 15.9997 2.66667 15.9997H13.3333C14.8061 15.9997 16 14.8058 16 13.333V12.3633C16 11.9617 15.6744 11.6361 15.2727 11.6361C14.8711 11.6361 14.5455 11.9617 14.5455 12.3633V13.333C14.5455 14.0025 14.0028 14.5451 13.3333 14.5451H2.66667C1.99723 14.5451 1.45455 14.0025 1.45455 13.333V12.3633Z" fill="#3F434A"/>
                </svg>
            </div>
            <div className='w-[130px] h-[40px] bg-[#fff] flex items-center justify-between rounded-lg p-2'>
              <p className='text-[#3F434A] font-Hat text-sm'>Last 7 days</p>
              <IoIosArrowDown className='w-[14px] h-[14px]' />
            </div>
        </div>
      </div>

      <div className='flex items-center gap-[30px] mt-[39px]'>
        <div className='flex justify-between items-center w-[350px] bg-[#fff] p-2 rounded-xl'>
          <div className='flex flex-col gap-2'>
            <p className='text-[15px] text-[#8A9099] font-Hat'>Total Income</p>
            <p className='text-[#3F434A] font-Hat font-medium text-[30px] '>{`₦${analyticsData?.total_income || 0}`}</p>
          </div>
          <img src={Dollar} alt='dollar' className='w-[66px] h-[66px]'/>
        </div>
        <div className='flex justify-between items-center w-[350px] bg-[#fff] p-2 rounded-xl'>
          <div className='flex flex-col gap-2'>
            <p className='text-[15px] text-[#8A9099] font-Hat'>Total Sales</p>
            <p className='text-[#3F434A] font-Hat font-medium text-[30px] '>{analyticsData?.total_sales || 0}</p>
          </div>
          <img src={ChartImg} alt='chart' className='w-[66px] h-[66px]'/>
        </div>
        <div className='flex justify-between items-center w-[350px] bg-[#fff] p-2 rounded-xl'>
          <div className='flex flex-col gap-2'>
            <p className='text-[15px] text-[#8A9099] font-Hat'>New Customers</p>
            <p className='text-[#3F434A] font-Hat font-medium text-[30px] '>{analyticsData?.new_customers || 0}</p>
          </div>
          <img src={User} alt='user' className='w-[66px] h-[66px]'/>
        </div>
      </div>

      <div className='flex items-center gap-[30px] mt-[30px]'>

        <div className='w-[540px] h-[402px] bg-[#fff] rounded-lg flex p-6 flex-col'>
          <div className='flex items-center justify-between'>
            <p className='font-Hat text-[#3F434A] font-medium text-[20px]'>Sales</p>
            <div className='flex items-center border p-1.5 rounded-xl'>
              {/* <img src={Calendar} alt='calender'/> */}
              <input type='date' className='outline-none appearance-none' placeholder='01/01/1900'/>
            </div>
          </div>

          <div className='flex flex-col items-start' style={{marginTop: "10px"}}> 
              <div className='relative flex  items-center'>
                <Chart options={data?.options} series={data?.series} type="donut" width="400" /> 
                <div className='absolute top-1/2 left-[38%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium font-Hat text-[#3F434A] text-[28px]'>{analyticsData?.total_sales}</p>
                    <p className='font-Hat text-[#8A9099] text-sm'>total</p>
                  </div>
                </div>
              </div>
          </div>

          {/* <button
            type='button'
            className='w-[134px] h-[40px] bg-[#304FFD] text-[#fff] flex items-center justify-center font-medium mx-auto mt-[20px] rounded-lg font-Hat'
          >
            View All
          </button> */}

        </div>

        {
            loadingTransactionData ? (
            <Skeleton variant='rectangular' width="350px" height="402px"  style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} />
            ) : (
            <div className='w-[540px] h-[402px] bg-[#fff] rounded-lg flex p-6 flex-col'>
                <div className='flex items-center justify-between'>
                <p className='font-Hat text-[#3F434A] font-medium text-[20px]'>Transactions</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.15 2C4.15 3.07696 3.27696 3.95 2.2 3.95C1.12304 3.95 0.25 3.07696 0.25 2C0.25 0.923048 1.12304 0.0500031 2.2 0.0500031C3.27696 0.0500031 4.15 0.923048 4.15 2ZM11.95 2C11.95 3.07696 11.077 3.95 10 3.95C8.92304 3.95 8.05 3.07696 8.05 2C8.05 0.923048 8.92304 0.0500031 10 0.0500031C11.077 0.0500031 11.95 0.923048 11.95 2ZM17.8 3.95C18.877 3.95 19.75 3.07696 19.75 2C19.75 0.923048 18.877 0.0500031 17.8 0.0500031C16.723 0.0500031 15.85 0.923048 15.85 2C15.85 3.07696 16.723 3.95 17.8 3.95Z" fill="#8A9099"/>
                </svg>
              </div>
              <div className='flex flex-col gap-[22px] mt-[35px]'>
                {
                  transactionData?.length > 0 ? transactionData.map((data, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                          <p className='font-Hat text-sm text-[#3F434A]'>{data?.user?.full_name}</p>
                          <p className='text-[11px] font-Hat text-[#8A9099]'>{`${new Date(data?.created_at).toLocaleTimeString()} - ${new Date(data?.created_at).toDateString().slice(4)}`}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                          <p className={`${data?.status === "Success" ? "text-[#49C96D]" : "text-[#FD7972]"} font-Hat`}>{`${data?.status === "Success" ? `+₦${data?.total_amount}` : `-₦${data?.total_amount}`}` }</p>
                          <p className='text-[11px] font-Hat text-[#8A9099]'>{data?.status}</p>
                        </div>
                    </div>
                  )) : (
                    <div className='h-[54px] bg-white border-t border-grey-100'>
                        <div className="relative">
                            <div className='absolute top-14 left-1/3 flex items-center justify-center'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/>
                                    <p>Oops! Nothing to see here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

              </div>

            </div>
            )
        }
      </div>

      <div className='flex items-center gap-[30px] mt-[28px]'>
        <div className='w-full h-[402px] bg-[#fff] rounded-lg flex p-6 flex-col'>
          <div className='flex items-center justify-between'>
            <p className='font-Hat text-[#3F434A] font-medium text-[20px]'>Last Orders</p>
            <div className='flex items-center border p-1.5 rounded-xl'>
              {/* <img src={Calendar} alt='calender'/> */}
              <input type='date' className='outline-none appearance-none' placeholder='01/01/1900'/>
            </div>
          </div>

          <div className='w-full mt-[42px]'>
            <div className='h-[18px] flex items-center gap-[120px]'>
              <p className="font-Hat text-[#8A9099]  text-[13px] text-left">
                  Customer Name
              </p>
              <div className='flex items-center gap-[53px]'>
                <p className="font-Hat text-[#8A9099] w-[100px] text-[13px] text-left">
                    Order No
                </p>
                <p className="font-Hat text-[#8A9099] w-[80px] text-[13px] text-left">
                    Amount
                </p>
                <p className="font-Hat text-[#8A9099] w-[100px] text-[13px] text-left">
                    Method {/* Payment Type */}
                </p>
                <p className="font-Hat text-[#8A9099] w-[90px] text-[13px] text-center">
                    Assignee
                </p>
                <p className="font-Hat text-[#8A9099] text-[13px] text-left">
                    Order Items
                </p>
                <p className="font-Hat text-[#8A9099] text-[13px] ml-5 text-left">
                    Date
                </p>
                {/* <p className="font-Hat text-[#8A9099] text-[13px] text-left">
                    
                </p> */}
              </div>
            </div>

            {allOrders?.length > 0 ? allOrders?.slice(0, 4)?.map((data, index) => (
                <div key={index} className='bg-[#F8F8F8] w-full flex items-center gap-[75px] my-[8px] h-[56px] rounded-2xl cursor-pointer '>
                    <div className='px-2 w-[150px]'>
                        <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{data?.name || "Not available"}</p> 
                    </div>
                    <div className='flex items-center gap-[43px]'>
                      <div className='w-[100px]'>
                          <p className='text-sm font-Mont text-dark-100 text-left'>{`#${data?.id?.substring(0, 8)}`}</p>
                      </div>
                      <div className=' w-[50px]'>
                          <p className='text-sm font-Mont text-dark-100 text-left'>{`₦${data?.total_amount}`}</p>
                      </div>
                      <div className=' w-[150px]'>
                          <p className='text-sm font-Mont text-dark-100 text-center'>{data?.delivery_method}</p>
                      </div>
                      <div className='w-[100px]'>
                          <p className='text-sm font-Mont text-dark-100 text-center'>{data?.assigned_to?.full_name || "N/A"}</p>
                      </div>
                      <div className='w-[100px]'>
                          <p className='text-sm font-Mont text-dark-100 text-center'>{data?.order_items?.length > 0 ? data?.order_items?.length : 0 }</p>
                      </div>
                      <div className='w-[100px]'>
                        <p className='text-sm font-Mont text-dark-100 text-left'>{new Date(data?.created_at).toLocaleDateString()}</p> 
                      </div>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 15.85C3.07696 15.85 3.95 16.723 3.95 17.8C3.95 18.877 3.07696 19.75 2 19.75C0.923048 19.75 0.0500031 18.877 0.0500031 17.8C0.0500031 16.723 0.923048 15.85 2 15.85ZM2 8.05C3.07696 8.05 3.95 8.92305 3.95 10C3.95 11.077 3.07696 11.95 2 11.95C0.923048 11.95 0.0500031 11.077 0.0500031 10C0.0500031 8.92305 0.923048 8.05 2 8.05ZM3.95 2.2C3.95 1.12304 3.07696 0.25 2 0.25C0.923048 0.25 0.0500031 1.12304 0.0500031 2.2C0.0500031 3.27696 0.923048 4.15 2 4.15C3.07696 4.15 3.95 3.27696 3.95 2.2Z" fill="#8A9099"/>
                      </svg> */}
                    </div>
                </div>
            )) : (
                <div className='h-[54px] bg-white border-t border-grey-100'>
                    <div className="relative">
                        <div className='absolute top-14 left-1/3 flex items-center justify-center'>
                            <div className='flex flex-col gap-2 items-center'>
                                <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/>
                                <p>Oops! Nothing to see here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>

  
        </div>

      </div>
    </div>
  )
}

export default Dashboard