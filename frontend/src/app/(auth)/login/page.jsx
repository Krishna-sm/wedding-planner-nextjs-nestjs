"use client";
import CustomButton from '@/components/CustomButton';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import *as yup from 'yup'

const LoginPage = () => {

        const [isHide,setIsHide] = useState(true)
        const [loading,setIsLoading] = useState(false)
        const {fetchUserProfile} = useMainContext()
        const router = useRouter()

        const initialValues ={ 
            email: '',
            password: ''
        }
        const validationSchema = yup.object({
            email: yup.string()
             .email('Invalid email address')
             .required('Email is required'),
            password: yup.string()
             .min(8, 'Password should be at least 8 characters long')
             .required('Password is required')
        })
        const onSubmitHandler = async(values,helpers)=>{
            try {
                setIsLoading(true)
                const response = await axiosClient.post("/auth/login",values)
                const data = await response.data;
       
                toast.success(data.msg)
                localStorage.setItem("token",data.token)
                await fetchUserProfile()
                router.push("/")

            } catch (error) {
                toast.error( error.response.data.message ||error.message)
            }finally{
                setIsLoading(false)
            }
        }
        


  return (
    <>
           <div className="flex min-h-[80vh] justify-center items-center">
         
                <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initialValues}>
                <Form className=" w-[96%] md:w-1/2 xl:w-1/2 2xl:w-1/3 shadow border border-tertary bg-white/5 py-10 px-10 rounded-md mx-auto ">
                 
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field type="text" id='email' name='email' className="w-full py-3 bg-transparant rounded-md border outline-none px-4 border-indigo-400 " placeholder='Enter Your Email' />
                            <ErrorMessage className='text-sm text-red-500' component={'p'} name='email' />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                      <div className="flex items-center justify-center gap-x-2 border border-indigo-400 px-3 rounded-md ">
                      <Field type={isHide?"password":"text"} id='password' name='password' className="w-full py-3 bg-transparant  outline-none    " placeholder='Enter Your Password' />
                     {      
                                isHide ?  <FaEye onClick={()=>setIsHide(!isHide)} className='text-3xl text-secondary' />:
                                <FaEyeSlash onClick={()=>setIsHide(!isHide)} className='text-3xl text-secondary'/>
                     }
                      </div>
                      <ErrorMessage className='text-sm text-red-500' component={'p'} name='password' />

                        </div>

                       




                        <div className="mb-3">
                            <CustomButton className={'py-4'} type="submit" isLoading={loading} label={'Login'} />
                        </div>
                        <div className="mb-3">
                            <p className="text-end text-indigo-500">
                                Don't Have An Account ? <Link href={'/register'} className='text-indigo-600 font-psmbold'>Register</Link>
                            </p>
                        </div>
                        
           </Form>
                </Formik>

           </div>
    </>
  )
}

export default LoginPage