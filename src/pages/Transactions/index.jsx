import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import ReactPaginate from 'react-paginate'

import { api } from '../../services/api'
import { appUrls } from '../../services/urls'

import Empty from "../../assets/png/empty.png"
import { CiSearch } from 'react-icons/ci'

const Transactions = () => {
    const [allTransactions, setAllTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10)
    const [itemOffset, setItemOffset] = useState(0);
    const [totalTransactions, setTotalTransaction] = useState(0);
    const [text, setText] = useState("")

    //Get Current data
    const filteredTransaction = allTransactions?.filter((item) => 
        item?.user?.account_name?.toLowerCase().includes(text.toLowerCase()) || ""
      )

    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = filteredTransaction?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredTransaction?.length / perPage);
   
  
   
    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % filteredTransaction?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const getAllTransactions = async () => {
        setLoading(true)
        await api.get(appUrls?.FETCH_TRANSACTION_URL)
        .then((res) => {
            console.log(res, "ojota")
            setLoading(false)
            setAllTransactions(res?.data?.data?.transactions)
        })
        .catch((err) =>{
            console.log(err, "spirit")
            setLoading(false)
        })
    }


    useEffect(() => {
        getAllTransactions()
    }, [])

    const formatter = new Intl.NumberFormat('en-US');

    const aggregateTotalAmount = (data) => {
        const total = data.reduce((sum, record) => sum + parseInt(record.total_amount, 10), 0);
        return total
    };
    
    console.log(aggregateTotalAmount(allTransactions)); // Output: 61000

    const handleText = (e) => setText(e.target.value)

  return (
    <div className='p-8'>
        <div className='flex items-center justify-between'>
            <p className='text-[24px] text-[#23272E] font-bold'>Transactions</p>
        </div>
        <div className='mt-[33px] '>
            {
                loading ?
                <Skeleton 
                    variant="rectangular" 
                    width={354} 
                    height={197} 
                    style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} 
                />
                :
                <div>
                    <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                    <div className='flex flex-col gap-[29px]'>
                        <div className='flex flex-col gap-1'>
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Transactions</p>
                            {/* <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p> */}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>₦{formatter.format(aggregateTotalAmount(allTransactions))}</p>
                            {/* <p>Last 7 days</p> */}
                        </div>
                    </div>
                    </div>
                </div>
            }
        </div>
        <div className='w-[200px] h-[40px] bg-[#fff] mt-5 flex items-center justify-between rounded p-2'>
          <input 
            name='search' 
            type='text' 
            placeholder='Search transactions'
            onChange={(e) => handleText(e)} 
            className='outline-none w-[146px]'
          />
          <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
        </div>
        {
            loading ?
            <Skeleton  variant="rectangular" width={1080} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', marginTop: "20px" }} />
            :
            <>
                <table className='w-full bg-[#fff] rounded-tr-xl rounded-tl-xl mt-4'>
                    <tr className='h-[48px]'>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Transaction ID
                        </th>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Name
                        </th>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Email
                        </th>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Amount
                        </th>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Channel
                        </th>
                        <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                            Status
                        </th>
                    </tr>

                    {currentData?.length > 0 ? currentData?.map((data, index) =>  {
                        return (
                            <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100' onClick={() => {setOpenAddImages(true); setProductData(data)}}>
                                <td className='h-[70px] px-4'>
                                    <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{`#${data?.txn_id}`}</p> 
                                </td>
                                <td className='h-[70px] px-4'>
                                    <p className='text-sm font-Mont text-dark-100 text-left'>{`${data?.user?.first_name} ${data?.user?.last_name}` || "N/A"}</p>
                                </td>
                                <td className='h-[70px] px-4'>
                                    <p className='text-sm font-Mont text-dark-100 text-left'>{data?.user?.email || "N/A"}</p>
                                </td>
                                <td className='h-[70px] px-4'>
                                    <p className='text-sm font-Mont text-dark-100 text-left'>{`₦${formatter.format(data?.total_amount)}`}</p>
                                </td>
                                <td className='h-[70px] px-4'>
                                    <p className='text-sm font-Mont text-dark-100 text-left'>{data?.channel || "N/A"}</p>
                                </td>
                                <td className='h-[70px] px-4'>
                                    <p className={`${data?.status === "Success" ? "text-[#27AE60]" : "text-[#f00]"} text-sm font-Mont text-left`}>
                                        {`${data?.status}`}
                                    </p>
                                </td>
                            
                            </tr>
                        )
                    }) : ( 
                        <tr className='h-[654px] bg-white border-t border-grey-100'>
                            <td colSpan="8" className="relative">
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/>
                                        <p>Oops! Nothing to see here.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </table>
                <div className=' mb-5 bg-[#fff]'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        className='w-full flex gap-3 font-Mont text-dark-100 font-semibold justify-end py-2 pr-10'
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        }
       
    </div>
  )
}

export default Transactions