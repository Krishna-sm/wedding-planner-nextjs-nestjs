import { useSendEnqueryMutation } from '@/app/redux/queries/PublicQuery'
import { UserSlicePath } from '@/app/redux/slices/UserSlice'
import CustomButton from '@/components/CustomButton'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import * as yup from 'yup'
const EnquieryForm = ({serviceId}) => {
    // const [loading,setLoading] = useState(false)

    const [sendHandler,sendResponse] = useSendEnqueryMutation()
    const {service} = useParams()
    const user = useSelector(UserSlicePath)

        const intialValues = {
            name:user?.name||'',
            email:user?.email||'',
            phone:user?.phone_no||'',
            message:'' 
        }

        const validationSchema = yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email address').required('Email is required'),
            phone: yup.string().required('Phone number is required'),
            message: yup.string().required('Message is required'),
            // service_name: yup.string().required('Service name is required'),
        })
        const onSubmitHandler = async(values,helpers)=>{
            try {

                const {data,error} = await sendHandler({service:serviceId,data:values})
                if(error){ 
                    throw new Error(error.message)
                    return 
                } 
                 
                Swal.fire({
                    icon: 'success',
                    title: data.msg,
                    confirmButtonText: 'Close'
                })
                helpers.resetForm()
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    confirmButtonText: 'Try again'
                })
            } 
        }

  return (

            <>
                    <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={intialValues}>
                        <Form className=' w-[98%] lg:w-[90%] mx-auto overflow-hidden'> 
                            <div className=" bg-logo py-5 rounded-t-3xl ">
                                <h1 className='text-center text-2xl text-white font-psmbold'>Enqury Form</h1>
                            </div>
                            <div className="form bg-white px-5 py-3 border">
                                <div className="mb-3">
                                    <label htmlFor="name">Name   <span className="text-red-500">*</span> </label>
                                    <Field name="name" id="name" className="w-full py-2 rounded border outline-none  px-4 bg-transparent"  placeholder="Enter Your Name"/>
                                    <ErrorMessage name='name' className='text-red-500 text-xs capitalize' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email <span className="text-red-500">*</span> </label>
                                    <Field name="email" className="w-full py-2 rounded border outline-none  px-4 bg-transparent" id="email"  placeholder="Enter Your Email"/>
                                    <ErrorMessage name='email' className='text-red-500 text-xs capitalize' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone">Phone <span className="text-red-500">*</span> </label>
                                    <Field name="phone" className="w-full py-2 rounded border outline-none  px-4 bg-transparent" id="phone"  placeholder="Enter Your Phone Number"/>
                                    <ErrorMessage name='phone' className='text-red-500 text-xs capitalize' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message">Message <span className="text-red-500">*</span> </label>
                                    <Field as="textarea" name="message" className="w-full py-2 rounded border outline-none  px-4 bg-transparent" id="message"  placeholder="Enter Your Message"/>
                                    <ErrorMessage name='message' className='text-red-500 text-xs capitalize' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <CustomButton type="submit" className={'!bg-logo'} label={'Submit'} isLoading={sendResponse.isLoading} />
                                </div> 

                            </div>

                        </Form>
                    </Formik>


            </>

  )
}

export default EnquieryForm