"use client";
import BackButton from '@/components/BackButton'
import BreadCrums from '@/components/BreadCrums'
import { ErrorMessage, Field, Formik } from 'formik' 
import { toast } from 'react-toastify'
import * as yup from 'yup'
import React, {use, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import CustomButton from '@/components/CustomButton';
import { useEditCategoryMutation, useGetCategoryQuery } from '@/app/redux/queries/AdminCategory';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
import Image from 'next/image';

const EditCategoryPage = (props) => {
    console.log(props)
  const [editCategoryFn,EditCategoryResponse] = useEditCategoryMutation() 
const params = use(props.params) 
  const {data,isLoading,isError} = useGetCategoryQuery(params.slug) 


  if(isLoading){
    return <div className="min-h-screen flex items-center justify-center w-full">
        <Loader/>
    </div>
  }


  if(isError){
    return <div className="min-h-screen flex items-center justify-center w-full">
        <ErrorComponent/>
    </div>
  }

  const initialValues = {
    name:data.name ||'',
    desc:data.desc ||'',
    image:null,
    preview_image:data.image.image_uri,
    status: data.isPublic ||false
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    desc: yup.string().required('Description is required'),
    image: yup.mixed().optional().nullable("Image also be a null"), 
    status: yup.boolean().required("Status is Required"),

  });

  const onSubmitHandler = async(values,helpers)=>{
    try {
      
        const update_obj={
            data:null
        }
      // console.log(values)
      // helpers.resetForm()
     if(values.image){
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('desc', values.desc)
        formData.append('image', values.image)
        formData.append('status', values.status)
        update_obj.data = formData
     }
     else{
        update_obj.data = {
            ...values,
            preview_image:undefined
        }
        
     }

      const {data:Data,error} = await editCategoryFn({id:data._id,data:update_obj.data})
      if(error) {
        toast.error(error.message)
        return
      }
      toast.success(Data.msg)
    //   console.log(data)

    //   helpers.resetForm()


    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }


  return (
    <>
        <BackButton/>

        <BreadCrums text={'Edit Category'} />


    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
    >

          {({handleSubmit,values,setFieldValue,errors})=>(
             <form onSubmit={handleSubmit} className="py-10 bg-white container rounded-md shadow px-4 xl:px-10"> 

             <div className="mb-3">
                    <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                    <Field name="name" id="name" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Category Name" />
                    <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='name' />
             </div>

             <div className="mb-3">
                    <label htmlFor="desc">Desc <span className="text-red-500">*</span></label>
                    <Field as="textarea" name="desc" id="desc" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Category Description" />
                    <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='desc' />
             </div>   

             <div className="mb-3">
             <label htmlFor="category_image">Category Image <span className="text-red-500">*</span></label>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                        <ImagePicker setFileValue={setFieldValue}  values={values.image} />
                                <div className="h-[20vh]">
                                <Image className='w-full py-3  h-full object-contain' src={values.preview_image} alt='image-d' width={1000} height={1000}  />
                                </div>
                        </div>
             
             </div>

                    <div className="mb-3">
                           <div className="mb-3">
                           <Field id="category_status" name="status" type="checkbox" className="px-2 mx-2"  />
                           <label  htmlFor="category_status">Category Status <span className="text-red-500">*</span></label>
                           </div>
                           <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='status' />

                    </div> 


             <div className="mb-3">
              <CustomButton type="submit" isLoading={EditCategoryResponse.isLoading} label={'Edit Category'} />
             </div>

             
             
             </form>
          )}
   
    </Formik>

    </>
  )
}

export default EditCategoryPage

const ImagePicker = ({setFileValue,values})=>{
  // const [image,setImage] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
   if(acceptedFiles[0]){
    // setImage(acceptedFiles[0])
    setFileValue('image',acceptedFiles[0])
   }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles:1,
    accept: {
      'image/*':['.jpg','.png','.jpeg','.svg']
    }
  })


  const onDeleteImage =()=>{
    // setImage(null)
    setFileValue('image',null)
  }
  return <>
    {values? <>    
            <div className=" w-[90%] xl:1/2 2xl:w-1/3 mx-auto   py-3 flex items-center justify-center relative">
                <img src={URL.createObjectURL(values)} alt="" />
                <button onClick={onDeleteImage} className='text-4xl p-3 text-black bg-white rounded-full shadow absolute top-[12px] right-[-4px] cursor-pointer'><RxCross2/></button>
            </div>
    </>: <div {...getRootProps()} className='w-full py-10 border border-dashed border-primary flex items-center justify-center flex-col'>
      <input {...getInputProps()} />
      {
        isDragActive ?
         <>
  <AiOutlineCloudUpload className='text-7xl text-primary'/>
  <p>uploading...</p>
         </> :
         <AiOutlineCloudUpload className='text-7xl text-primary'/>

      }
    </div>}
  </>
}