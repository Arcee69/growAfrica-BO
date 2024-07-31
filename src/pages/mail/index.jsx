import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Form, Formik } from "formik"

import { api } from '../../services/api'
import { appUrls } from '../../services/urls'
import { CgSpinner } from 'react-icons/cg'

const Mailing = () => {
  const [loading, setLoading] = useState(false)
  

  const submitForm = async (values, action) => {
    setLoading(true)
    const data = {
        "type": values?.type,
        "subject": values?.subject,
        "message": values?.message
    }
    await api.post(appUrls?.SEND_MAIL_URL, data)
    .then((res) => {
        setLoading(false)
        console.log(res, "apako")
        toast(`Mail Sent Successfully`, { 
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
        });
        action.resetForm()
    })
    .catch((err) => {
        setLoading(false)
        console.log(err, "Pablo")
        toast(`${err.data.message}`, { 
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
        });
    })
}

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between'>
        <p className='text-[24px] text-[#23272E] font-bold'>Mailing</p>
      </div>
      <div className="h-[500px] mt-5">
          <Formik
              initialValues={{
                  type: "",
                  subject: "",
                  message: ""
              }}
          //   validationSchema={formValidationSchema}
              onSubmit={(values, action) => {
                  window.scrollTo(0, 0)
                  console.log(values, "often")
                  submitForm(values, action)
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
          <Form onSubmit={handleSubmit} className="flex flex-col lg:items-center">
              <div className='flex flex-col gap-6 lg:items-center h-[47px]'>
      
                  <div className="flex flex-col gap-1">
                      <label htmlFor='User Type' className="font-Hat font-medium text-[#8A9099]">User Type</label>
                      <select 
                        name='type'
                        value={values?.type} 
                        className="rounded-lg border-[#27AE60] outline-none xs:w-full outline-none lg:w-[420px] mt-1.5 h-[51px] border-solid  p-3 border" 
                        onChange={handleChange} 
                      >
                          <option defaultValue>Select User...</option>
                          <option value="buyer" >Buyers</option>
                          <option value="seller">Sellers</option>
                      </select>
                     
                      {errors.type && touched.type ? (
                      <div className='text-RED-_100'>{errors.type}</div>
                      ) : null}
                  </div>

                  
                  <div className="flex flex-col gap-1">
                      <label htmlFor='Subject' className="font-Hat font-medium text-[#8A9099]">Subject</label>
                      <input
                          name="subject"
                          placeholder="Subject"
                          type="text" 
                          value={values.subject}
                          onChange={handleChange}
                          className="rounded-lg border-[#27AE60] xs:w-full outline-none lg:w-[420px] mt-1.5 h-[51px] border-solid  p-3 border"
                      />
                      {errors.subject && touched.subject ? (
                      <div className='text-RED-_100'>{errors.subject}</div>
                      ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                      <label htmlFor='Message' className="font-Hat font-medium text-[#8A9099]">Message</label>
                      <textarea
                          name="message"
                          placeholder="Type here...."
                          type="text" 
                          value={values.message}
                          onChange={handleChange}
                          className="rounded-lg border-[#27AE60] xs:w-full outline-none lg:w-[420px] mt-1.5 h-[100px] border-solid  p-3 border"
                      ></textarea>
                      {errors.message && touched.message ? (
                      <div className='text-RED-_100'>{errors.message}</div>
                      ) : null}
                  </div>
              
                  <button 
                      className= " bg-[#27AE60] mt-5  xs:w-full lg:w-[420px] text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex justify-center"
                      type="submit"
                  >
                      <p className='text-[#fff] text-sm  text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Submit'}</p>
                  </button>
              
              </div>
              

          </Form>
      )}
          </Formik>
      </div>
    </div>
  )
}

export default Mailing