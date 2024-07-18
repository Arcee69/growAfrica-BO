import React from 'react'
import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import * as Yup from "yup"

import CloseIcon from "../../../assets/svg/closeIcon.svg"
import { appUrls } from '../../../services/urls';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';

const AddAdmin = ({ handleClose, addAdminLoading, setAddAdminLoading}) => {

    const formValidationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    })


    const submitForm = async (values, action) => {
        setAddAdminLoading(true)
        const data = {
            "first_name": values?.firstName,
            "last_name": values?.lastName,
            "email": values?.email,
            "password": values?.password,
            "password_confirmation": values?.confirmPassword
        }
        await api.post(appUrls?.CREATE_ADMIN_URL, data)
        .then((res) => {
            console.log(res, "john")
            setAddAdminLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            action.resetForm();
            handleClose()
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setAddAdminLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }

  return (
    <div className='bg-[#fff] w-[600px] h-[600px] flex flex-col gap-4 overflow-y-scroll  mt-[100px] rounded-lg p-4'>
        <div className='flex items-center justify-between'>
            <p className='font-medium font-Hat text-[#3F434A]  text-[24px] text-[#000]'>Create  Admin</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='mt-[15px]'>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
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
                            <label htmlFor='First Name' className='font-Hat text-[#8A9099]'>First Name</label>
                            <input 
                                name="firstName"
                                placeholder="First Name"
                                type='text'
                                value={values?.firstName}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.firstName && touched.firstName ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.firstName}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Last Name' className='font-Hat text-[#8A9099]'>Last Name</label>
                            <input 
                                name="lastName"
                                placeholder="Last Name"
                                type='text'
                                value={values?.lastName}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.lastName && touched.lastName ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.lastName}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Email' className='font-Hat text-[#8A9099]'>Email</label>
                            <input 
                                name="email"
                                placeholder="Email"
                                type='text'
                                value={values?.email}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.email && touched.email ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.email}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Password' className='font-Hat text-[#8A9099]'>Password</label>
                            <input 
                                name="password"
                                placeholder="Password"
                                type='password'
                                value={values?.password}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.password && touched.password ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.password}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Confirm Password' className='font-Hat text-[#8A9099]'>Confirm Password</label>
                            <input 
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type='password'
                                value={values?.confirmPassword}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.confirmPassword}
                            </div>
                            ) : null}
                        </div>


                       
                        <div className='mt-[26px] flex items-center gap-3'>
                            <button
                                className="w-[228px] font-inter flex items-center justify-center h-[46px] bg-[#27AE60] text-lg rounded text-center"
                                type="submit"
                                // disabled={addCategoryLoading}
                            >
                                <p className='text-[#fff] text-sm font-semibold'>{addAdminLoading ? <CgSpinner className=" animate-spin text-xl " /> : 'Create Admin'}</p>
                                
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

export default AddAdmin