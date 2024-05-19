import React, { useEffect, useState } from 'react'
import { CgSpinner } from "react-icons/cg"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { toast } from 'react-toastify'

import CloseIcon from "../../../assets/svg/closeIcon.svg"
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'

const AddProduct = ({ handleClose, addProductLoading, setAddProductLoading }) => {    
    const [productsCategory, setProductsCategory] = useState([])


    const formValidationSchema = Yup.object().shape({
        productName: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        category: Yup.string().required()
    })

    const getProductCategory = async () => {
        try {
            const res = await api.get(appUrls?.GET_PRODUCTS_CATEGORY_URL);
            setProductsCategory(res?.data?.data?.categories);
        } catch (err) {
            console.error(err, "Error fetching product categories");
        }
    };

    useEffect(() => {
        getProductCategory()
    }, [])


    const submitForm = (values, action) => {
        setAddProductLoading(true)
        const data = {
            name: values?.productName,
            category_id: values?.category,
            unit_price: values?.price,
            description: values?.description
        }
        api.post(appUrls?.PRODUCTS_URL, data)
        .then((res) => {
            console.log(res, "john")
            setAddProductLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            action.resetForm()
            handleClose()
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setAddProductLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }


  return (
    <div className='bg-[#fff] w-[600px] h-[500px] flex flex-col gap-4 overflow-y-scroll  mt-[50px] rounded-lg p-4'>
        <div className='flex items-center justify-between'>
            <p className='font-medium font-Hat text-[#3F434A]  text-[24px] text-[#000]'>Product Information</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='mt-[15px]'>
            <Formik
                initialValues={{
                    productName: "",
                    description: "",
                    price: "",
                    category: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values, action) => {
                window.scrollTo(0, 0);
                console.log(values, "market")
                submitForm(values, action);
                }}
            >
            {({
                handleSubmit,
                handleChange,
                dirty,
                isValid,
                setFieldValue,
                errors,
                touched,
                // setFieldTouched,
                values,
            }) => (
                <Form onSubmit={handleSubmit} className="flex ">
                    <div className="flex flex-col gap-[27px]">
                        
                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Product Name' className='font-Hat text-[#8A9099]'>Product Name</label>
                            <input 
                                name="productName"
                                placeholder="Product Name"
                                type='text'
                                value={values?.productName}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.productName && touched.productName ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.productName}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label htmlFor='Description' className='font-Hat text-[#8A9099]'>Description</label>
                            <textarea 
                                name="description"
                                placeholder="Description"
                                type='text'
                                value={values?.description}
                                onChange={handleChange}
                                className='w-full h-[200px]  outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            ></textarea>
                            {errors.description && touched.description ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.description}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Price' className='font-Hat text-[#8A9099]'>Price</label>
                            <input 
                                name="price"
                                placeholder="0.00"
                                value={values?.price}
                                type='number'
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.price && touched.price ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.price}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Category' className='font-Hat text-[#8A9099]'>Category</label>
                            <select
                                name='category'
                                onChange={handleChange}
                                value={values?.category}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            >
                                {productsCategory?.map((item,) => (
                                    <option 
                                        value={item?.id} 
                                        key={item?.id}
                                    >
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && touched.category ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.category}
                            </div>
                            ) : null}
                        </div>

                       
                        <div className='mt-[26px] flex items-center gap-3'>
                            <button
                                className="w-[228px] font-inter flex items-center justify-center h-[46px] bg-[#50724D] text-lg rounded text-center"
                                type="submit"
                                disabled={addProductLoading}
                            >
                                <p className='text-[#fff] text-sm font-semibold'>{addProductLoading ? <CgSpinner className=" animate-spin text-xl " /> : 'Save Product'}</p>
                                
                            </button>
                            <button
                                className="w-[132px] font-Hat flex items-center justify-center h-[46px] bg-[#E5E5E5] text-lg rounded text-center"
                                type="button"
                                onClick={handleClose}
                            >
                                <p className='text-[#595F69] text-lg font-medium'>Cancel</p>
                                
                            </button>
                        </div>
                    </div>

                </Form>
            )}

            </Formik>
        </div>
    </div>
  )
}

export default AddProduct