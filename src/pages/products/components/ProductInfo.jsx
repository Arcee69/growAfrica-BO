import React from 'react'

import CloseIcon from "../../../assets/svg/closeIcon.svg"

const ProductInfo = ({ handleClose, productData }) => {
    console.log(productData, "sample")
  return (
    <div className='w-[600px] h-[500px] overflow-y-scroll mt-[20px] px-5 rounded-lg bg-[#fff] flex flex-col pt-5 '>
        <div className='flex justify-between mb-4'>
            <p className='text-[#000] text-lg font-Hat'>Product Details</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='flex flex-col gap-5'>
            <img src={productData?.thumbnail} alt='thumbnail' className='w-[300px] h-[300px] mx-auto' />
            <div className='flex flex-col gap-3'>
                <p className='text-[#000] text-lg font-mont font-semibold'>Product ID: <span className='text-sm font-poppins font-medium'>{productData?.id}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Product Name: <span className='text-sm font-poppins font-medium'>{productData?.name}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Product Description: <span className='text-sm font-poppins font-medium'>{productData?.description}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Sellers Name: <span className='text-sm font-poppins font-medium'>{`${productData?.seller?.first_name} ${productData?.seller?.last_name}`}</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Inventory: <span className='text-sm font-poppins font-medium'>{productData?.inventory} Pieces</span></p>
                <p className='text-[#000] text-lg font-mont font-semibold'>Price: <span className='text-sm font-poppins font-medium'>{productData?.unit_price}</span></p>

            </div>
        </div>
    </div>
  )
}

export default ProductInfo