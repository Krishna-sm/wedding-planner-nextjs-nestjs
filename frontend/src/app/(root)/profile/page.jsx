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
const ProfilePage = () => {
    const user = useSelector(UserSlicePath)

    const initialValues = {
        name: user.name || '',
        gender: user.gender || '',
        bio: user.bio || ''

    }

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        gender: yup.string().required('Gender is required'),
        bio: yup.string().required('Bio is required'),
    });

    const onBasicProfileUpdateHandler = (values, helpers) => {
        try {
            toast.success("Profile Updated !")
        } catch (error) {
            toast.error(error.response.data.message || error.message)
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
                                    <label htmlFor="gender">Gender <span className="text-red-500">*</span> </label>
                                    <Select onValueChange={(gender) => setFieldValue('gender', gender)} defaultValue={values.gender} >
                                        <SelectTrigger className="w-full py-2 px-4 bg-transaparant border outline-none rounded-md">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
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
                                    <CustomButton label={'Update Profile'} />
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
            console.log(data)
            toast.success("Profile Avatar Updated!")

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
                <img src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" className=' object-cover w-full h-full rounded-full mx-auto' alt="" />
                <button className='bottom-[15px] right-0 absolute text-xl p-2 shadow text-black bg-white  rounded-full'>
                    <PiPencilSimple />
                </button>
            </div>


              
 
      }
        </div>}

    </>
}