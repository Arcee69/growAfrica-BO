import React, { useEffect, useState } from 'react'
import { CgSpinner } from "react-icons/cg"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { toast } from 'react-toastify'

import CloseIcon from "../../../assets/svg/closeIcon.svg"
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'

const AddCategory = ({ handleClose, addCategoryLoading, getAllCategory, setAddCategoryLoading }) => {    


    const formValidationSchema = Yup.object().shape({
        categoryName: Yup.string().required(),
    })


    const submitForm = (values, action) => {
        setAddCategoryLoading(true)
        const data = {
            name: values?.categoryName,
        }
        api.post(appUrls?.GET_PRODUCTS_CATEGORY_URL, data)
        .then((res) => {
            console.log(res, "john")
            setAddCategoryLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            action.resetForm();
            handleClose();
            getAllCategory();
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setAddCategoryLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }


  return (
    <div className='bg-[#fff] w-[600px] h-[300px] flex flex-col gap-4 overflow-y-scroll  mt-[100px] rounded-lg p-4'>
        <div className='flex items-center justify-between'>
            <p className='font-medium font-Hat text-[#3F434A]  text-[24px] text-[#000]'>Category Information</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='mt-[15px]'>
            <Formik
                initialValues={{
                    categoryName: "",
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
                            <label htmlFor='Category Name' className='font-Hat text-[#8A9099]'>Category Name</label>
                            <input 
                                name="categoryName"
                                placeholder="Category Name"
                                type='text'
                                value={values?.categoryName}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.categoryName && touched.categoryName ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.categoryName}
                            </div>
                            ) : null}
                        </div>

                       
                        <div className='mt-[26px] flex items-center gap-3'>
                            <button
                                className="w-[228px] font-inter flex items-center justify-center h-[46px] bg-[#50724D] text-lg rounded text-center"
                                type="submit"
                                disabled={addCategoryLoading}
                            >
                                <p className='text-[#fff] text-sm font-semibold'>{addCategoryLoading ? <CgSpinner className=" animate-spin text-xl " /> : 'Save Category'}</p>
                                
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

export default AddCategory