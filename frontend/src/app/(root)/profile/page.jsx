"use client";
import { UserSlicePath } from '@/app/redux/slices/UserSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { PiPencilSimple } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { IoCloudUploadOutline } from "react-icons/io5";
import DefaultPic from '@/assets/images/default_icon.avif'


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import CustomButton from '@/components/CustomButton';
import { axiosClient } from '@/utils/AxiosClient';
import { CgSpinner } from 'react-icons/cg';
import Image from 'next/image';
import { useMainContext } from '@/context/MainContext';
const ProfilePage = () => {
    const user = useSelector(UserSlicePath)
    const {fetchUserProfile}= useMainContext()
    const [loading,setLoading] = useState(false)

    const initialValues = {
        name: user.name || '',
        gender: user.gender || '',
        bio: user.bio || '',
        phone_no:user.phone_no||'',
        address:{
            street:user.address?.street|| '',
            landmark: user.address?.landmark||'',
            pincode: user.address?.pincode||'',
        }

    }

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        gender: yup.string().required('Gender is required'),
        bio: yup.string().required('Bio is required'),
        address: yup.object().shape({
            street: yup.string().required('Street is required'),
            landmark: yup.string().required('Landmark is required'),
            pincode: yup.string().required('Pin Code is required'),  
        }),
        // validate with indian mobile no 
        phone_no: yup.string().matches(/^[6-9]\d{9}$/, {
            message: 'Invalid Indian Mobile Number',
            type: 'pattern',
        }).required("Mobile Number is Required")

    });

    const onBasicProfileUpdateHandler = async(values, helpers) => {
        try {
            
            setLoading(true)
            const response = await  axiosClient.put("/auth/update-profile",values,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const data = await response.data
            toast.success(data.msg)
            await fetchUserProfile()

        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>

            <div className="mb-3 mx-auto   ">
                <ImageUpdateComponent />

                <div className="w-full py-10 my-10 bg-white shadow">

                    <Formik onSubmit={onBasicProfileUpdateHandler} validationSchema={validationSchema} initialValues={initialValues}>
                        {({ handleSubmit, values, setFieldValue }) => (
                            <form onSubmit={handleSubmit} className=' w-[96%] lg:w-1/2 2xl:w-1/3 mx-auto '>
                                <div className="mb-3">
                                    <label htmlFor="name">Name <span className="text-red-500">*</span> </label>
                                    <Field name="name" id="name" type="text" className="w-full py-2 px-4 bg-transaparant border outline-none rounded-md" placeholder='Enter Your Name' />
                                    <ErrorMessage className='text-sm text-red-500' name='name' component={'p'} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email <span className="text-red-500">*</span> </label>
                                    <input id="email" type="email" readOnly defaultValue={user.email} className="w-full py-2 px-4 bg-transaparant border outline-none rounded-md" placeholder='Enter Your Email' />
                           

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone_no">Mobile No <span className="text-red-500">*</span> </label>
                                    <Field name="phone_no" id="phone_no" type="text" className="w-full py-2 px-4 bg-transaparant border outline-none rounded-md" placeholder='Enter Your Mobile No.' />

                                    <ErrorMessage className='text-sm text-red-500' name='phone_no' component={'p'} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gender">Gender <span className="text-red-500">*</span> </label>
                                    <Select onValueChange={(gender) => setFieldValue('gender', gender)} defaultValue={values.gender} >
                                        <SelectTrigger className="w-full py-2 px-4 bg-transaparant border outline-none rounded-md">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage className='text-sm text-red-500' name='gender' component={'p'} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="bio">Bio <span className="text-red-500">*</span> </label>

                                    <Textarea
                                        id="bio"
                                        placeholder="Describe yourself in simple words"
                                        className="resize-none w-full py-2 px-4 bg-transaparant border outline-none rounded-md "
                                        onChange={(e) => setFieldValue("bio", e.target.value)}
                                        value={values.bio}
                                    />
                                </div>

                                        <div className="mb-3">
                                    <label htmlFor="street">Street <span className="text-red-500">*</span> </label>
                                    <Field
                                        id="street"
                                        placeholder="Enter Your Street"
                                        className="resize-none w-full py-2 px-4 bg-transaparant border outline-none rounded-md " 
                                        name="address.street"  
                                    />
                                    <ErrorMessage className='text-sm text-red-500' name='address.street' component={'p'} />

                                        </div>

                                        <div className="mb-3">
                                    <label htmlFor="pincode">Pin Code <span className="text-red-500">*</span> </label>
                                    <Field
                                        id="pincode"
                                        placeholder="Enter Your Pin Code"
                                        className="resize-none w-full py-2 px-4 bg-transaparant border outline-none rounded-md " 
                                        name="address.pincode"  
                                    />
                                    <ErrorMessage className='text-sm text-red-500' name='address.pincode' component={'p'} />

                                        </div>

                                        <div className="mb-3">
                                    <label htmlFor="landmark">LandMark <span className="text-red-500">*</span> </label>
                                    <Field
                                        id="landmark"
                                        placeholder="Enter Your Landmark"
                                        className="resize-none w-full py-2 px-4 bg-transaparant border outline-none rounded-md " 
                                        name="address.landmark"  
                                    />
                                    <ErrorMessage className='text-sm text-red-500' name='address.landmark' component={'p'} />

                                        </div>


                                <div className="mb-3">
                                    <CustomButton isLoading={loading} label={'Update Profile'} />
                                </div>
                            </form>
                        )}
                    </Formik>

                </div>

            </div>

        </>
    )
}

export default ProfilePage


const ImageUpdateComponent = () => {


    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false)
    const user = useSelector(UserSlicePath)
    const {fetchUserProfile} = useMainContext()
        console.log(user)
    const updateProfleAvatar =async(file)=>{
        try {
            setLoading(true)
            const form_data  = new FormData()
            form_data.append('image', file)
            const response = await axiosClient.put("/auth/update-avatar",form_data,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${localStorage.getItem("token") || ''}`
                },
              
            })

            const data = await response.data 
            toast.success(data.msg)
            await fetchUserProfile()

        } catch (error) {
                toast.error( error.response.data.message ||error.message)
        }finally{
            setLoading(false)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles[0]) {
            setImage(acceptedFiles[0]);
            updateProfleAvatar(acceptedFiles[0])

        }
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return <>

       {loading ? <>
                <div className="w-[200px] mx-auto py-10  h-[200px] rounded-full ">
                        <CgSpinner className='animate-spin text-8xl' />

                </div>
       </>: <div {...getRootProps()} className='w-[200px] mx-auto '>
            <input {...getInputProps()} />
            {


                image ? 
                <div className="relative mx-auto  w-[200px] h-[200px] object-cover  ">
                    <img src={URL.createObjectURL(image)} className=' object-cover w-full h-full rounded-full mx-auto' alt="profile avatar" />
                    <button className='bottom-[15px] right-0 absolute text-xl p-2 shadow text-black bg-white  rounded-full'>
                        <PiPencilSimple />
                    </button>
                </div> : 

                    isDragActive ?  <div className="flex items-center rounded-full mx-auto shadow  flex-col justify-center w-[200px] h-[200px] object-cover ">
                    <IoCloudUploadOutline className="text-8xl text-gray-500" />
                    <p className="mt-2 text-gray-700 text-sm">Drag and drop  </p>
                </div> : 
                <div className="relative mx-auto  w-[200px] h-[200px] object-cover  ">
                <Image width={1000} height={1000}  src={user && user.avatar ?user.avatar : DefaultPic} className=' object-cover w-full h-full rounded-full mx-auto' alt="Profile Pic" />
                <button className='bottom-[15px] right-0 absolute text-xl p-2 shadow text-black bg-white  rounded-full'>
                    <PiPencilSimple />
                </button>
            </div>


              
 
      }
        </div>}

    </>
}