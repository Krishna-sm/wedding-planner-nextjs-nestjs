"use client"; 
import BackButton from '@/components/BackButton'
import BreadCrums from '@/components/BreadCrums'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik' 
import { toast } from 'react-toastify'
import * as yup from 'yup'
import React, {useCallback, useState,use} from 'react'
import {useDropzone} from 'react-dropzone'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import CustomButton from '@/components/CustomButton'; 
import { GoPlus } from 'react-icons/go';
import MarkDownCustomEditor from '@/components/reuseable/MarkdownCustomEditor';
import { SectionsTitles } from '@/utils/constant.vendor';
import { CiTrash } from "react-icons/ci";
import Swal from 'sweetalert2';
import { useCreateVendorServiceMutation, useFetchAllCategoriesServiceQuery, useGetServiceByIdQuery, useUpdateServiceByIdMutation } from '@/app/redux/queries/VendorService';
import Loader from '@/components/Loader';
import ErrorComponent from '@/components/ErrorComponent';
import Image from 'next/image';

const EditServicePage = (props) => {

    const params = use(props.params)
    const {data:service,isLoading:ServiceLoading,isError} = useGetServiceByIdQuery(params.id)

    


     const [CreateMutaitonFunction,CreateMutaitonResponse] = useUpdateServiceByIdMutation()
      const {data : AllCategories,isLoading} = useFetchAllCategoriesServiceQuery()



      if(ServiceLoading){
        return <div className="min-h-[50vh] flex w-full bg-white items-center justify-center">
            <Loader/>
        </div>
      }
      if(isError){
        return <div className="min-h-[50vh] flex w-full bg-white items-center justify-center">
          <ErrorComponent/>
        </div>
      }

    
      const initialValues = {
        category:service.category ||'',
        budget:service.budget ||'',
        title:service.title ||'',
        desc:service.desc ||'',
        images:[],
        previews_images:service.images||[],
        isPublish:service.isPublish ||false,
        removed_image:[],
        sections:service.sections ||[
          {
            title:'',
            content:''
          }
        ],
        keywords:service.keywords ||''
      }
    
      const validationSchema = yup.object({
        category: yup.string().required('Please Select Valid Category'),
        budget: yup.number().required('Enter Valid Budget').min(100,"Budget Should be grater than ₹ 100/-"),
        title: yup.string().required('Service Name is required'),
        desc: yup.string().required('Description is required'),
        image: yup.array().of(yup.mixed().required('Image is required')),
        sections: yup.array().of(
          yup.object().shape({
            title: yup.string().required('Title is required'),
            content: yup.string().required('Content is required'),
          })),
          keywords: yup.string().required('Keywords is required'),
          isPublish: yup.boolean().required("Status is Required"),
            
      });
    
      const onSubmitHandler = async(values,helpers)=>{
        try {
          
          // console.log("values",values)
    
          
    
          // helpers.resetForm()
          const updateObj = {
            data:{}
          }
          if(values?.images?.length>0){
            const formData = new FormData()
            formData.append('category', values.category)
            formData.append('title', values.title)
            // formData.append('previews_images', values.previews_images)
             // pass sections in formdata as an array
             values.removed_image.forEach((imaged, index) => {
                formData.append(`removed_image[${index}]`, imaged); 
            });
        
            // formData.append('removed_image', values.removed_image)
            formData.append('desc', values.desc)
            formData.append('isPublish', values.isPublish)
              // formData.append('images', values.images)
            // pass images in formdata as an array
            values.images.forEach((image) => {
              formData.append("images", image);
          });
      
            // pass sections in formdata as an array
            values.sections.forEach((section, index) => {
              formData.append(`sections[${index}][title]`, section.title);
              formData.append(`sections[${index}][content]`, section.content);
          });
      
       
            formData.append('keywords', values.keywords)
            formData.append('budget', values.budget)
            updateObj['data'] = formData
          }else{
       
                updateObj['data']=   {
                    ...values,
                    previews_images:undefined
                }
              
         
        
          }
        




    
          const {data,error} = await CreateMutaitonFunction({id:params.id,data:updateObj.data})
          if(error) {
            toast.error(error.message)
            return
          }
          console.log(data)
        //   toast.success(data.msg)
        
    
        //   helpers.resetForm()
    
    
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
      }
      
    

  return (
    <>
           <BackButton/>
           
                   <BreadCrums text={'Update Service'} />
           
           
               <Formik
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={onSubmitHandler}
               >
           
                     {({handleSubmit,values,setFieldValue,errors})=>(
                        <form onSubmit={handleSubmit} className="py-10 bg-white container rounded-md shadow px-4 xl:px-10"> 
           
           <div className="mb-3">
                               <label htmlFor="category">Category <span className="text-red-500">*</span></label>
                               <Field as="select" name="category" id="category" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Choose Valid Category" >
                              {isLoading? <option value="">loading...</option>:   <option value="">select</option>}
                                   {
                                     !isLoading && AllCategories.map((cur,i)=>{
                                       return <option key={i} value={cur._id}>{cur.name}</option>
                                     })
                                   }
                               </Field>
                               <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='category' />
                        </div>
           
           
           
                        <div className="mb-3">
                               <label htmlFor="title">Name <span className="text-red-500">*</span></label>
                               <Field name="title" id="title" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Service Title" />
                               <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='title' />
                        </div>
           
                        <div className="mb-3">
                               <label htmlFor="desc">Desc <span className="text-red-500">*</span></label>
                               <Field as="textarea" name="desc" id="desc" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Service Description" />
                               <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='desc' />
                        </div>   
           
                        <div className="mb-3">
                        <label htmlFor="category_image">Service Images <span className="text-red-500">*</span></label>
           
                         <ImagePicker setFileValue={setFieldValue}  values={values.images} />
                        </div>

                        <div className="mb-3">

                                    <ShowPreviewImages previews_images={values.previews_images} setFieldValue={setFieldValue} removed_image={values.removed_image} />

                        </div>



           
                        <div className="mb-3  w-full">
                                      
           
           
                                       <FieldArray
                        name="sections"
                        render={arrayHelpers => {
                         const SectionValues= SectionsTitles
           
            
           
           
                          return <div >
                                  <div className="flex items-center justify-between">
                                  <h1 className='text-4xl font-pbold py-4   '>Sections</h1>
                                       <button  disabled={values?.sections?.length>=SectionValues.length} onClick={() => arrayHelpers.insert( values?.sections?.length > 0 ?values?.sections?.length :0,{
                                         title:'',
                                         content:''
                                       })} type='button' className='p-2 bg-indigo-600 text-3xl cursor-pointer rounded-full disabled:bg-indigo-400 text-white'> <GoPlus />
                                       </button>
                                  </div>
           
                            {values.sections && values?.sections?.length > 0 ? (
                              values.sections.map((section, index) => {
           
                               
            
           
                              return  <AddSectionForm key={index}
                                Titlename={`sections[${index}].title`}
                                Contentname={`sections[${index}].content`}
                               setFieldValue={setFieldValue} removeHandler={()=>arrayHelpers.remove(index)} values={values.sections} conent_default_value={section.content}  />
            
                        })
                            ) : (
                             <></>
                            
                            )}
                            
            
                          </div>
                        }}
                      />
           
           
           
                        </div>
           
           <div className="mb-3">
                          <label htmlFor="keywords">Keywords <span className="text-red-500">*</span></label>
                               <Field name="keywords" id="keywords" className="w-full border-primary border outline-none rounded-md px-3 py-3" placeholder="Enter Keywords" />
                               <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='keywords' />
                        
           </div>
           
           <div className="mb-3">
                   <label htmlFor="budget">
                   Budget <span className="text-red-500">*</span>
                   </label>
                   <Field
                   name="budget"
                   id="budget"
                   className="w-full border-primary border outline-none rounded-md px-3 py-3"
                   placeholder="Enter Your Service Budget"
                   onKeyPress={(event) => {
                   if (!/[0-9]/.test(event.key)) {
                     event.preventDefault();
                   }
                   }}
                   />
                   <ErrorMessage className="text-red-500 text-sm" component="p" name="budget" />
                        </div>

                        <div className="mb-3">
                           <div className="mb-3 flex items-center gap-x-3 w-full">
                           <Field name="isPublish" id="isPublish" className="" type="checkbox" placeholder="Enter status" />
                           <label htmlFor="isPublish">Status <span className="text-red-500">*</span></label>
                           </div>
                               <ErrorMessage className='text-red-500 text-sm ' component={'p'} name='status' />
                        
           </div>
           
           
           
           
                        <div className="mb-3">
                         <CustomButton type="submit" isLoading={CreateMutaitonResponse.isLoading} label={'Update Service'} />
                        </div>
           
                     {JSON.stringify(values)}
                        
                        </form>
                     )}
              
               </Formik>
    </>
  )
}

export default EditServicePage



const ImagePicker = ({setFileValue,values})=>{
  // const [image,setImage] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
   if(acceptedFiles.length>0){
    // setImage(acceptedFiles[0])
    setFileValue('images',acceptedFiles)
   }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles:20,
    accept: {
      'image/*':['.jpg','.png','.jpeg','.svg']
    }
  })


  const onDeleteImage =(index)=>{
    const new_image = values.filter((cur,i)=>i!==index)
    // setImage(null)
    setFileValue('images',new_image)
  }
  return <>
    {values && values.length>0 ? <>    
                        <div className="grid  grid-cols-3 xl:grid-cols-5">
                        {
                        values.map((cur,i)=>{
                            return  <div key={i} className=" w-[90%] xl:1/2 2xl:w-1/3 mx-auto   py-3 flex items-center justify-center relative">
                            <img src={URL.createObjectURL(cur)} alt="" />
                            <button type='button' onClick={()=>onDeleteImage(i)} className='text-2xl p-1 text-black bg-white rounded-full shadow absolute top-[12px] right-[-4px] cursor-pointer'><RxCross2/></button>
                        </div>
                        })
                    }

                        </div>

    </>: <div {...getRootProps()} className='w-full py-10 border border-dashed border-primary flex items-center justify-center flex-col'>
      <input {...getInputProps()} />
      {
        isDragActive ?
         <>
  <AiOutlineCloudUpload className='text-7xl text-primary'/>
  <p>uploading...</p>
         </> :
        <>
         <AiOutlineCloudUpload className='text-7xl text-primary'/>
         <p>Upload Images</p>

        </>
      }
    </div>}
  </>
}

const AddSectionForm = ({Titlename,Contentname,removeHandler,setFieldValue,conent_default_value,values,filterSection})=>{

  // const filterSections = values.filter((cur,i)=>{
  //   return !SectionValues.find((val) ===cur)
  // }).map((cur,i)=>{
  //       return 
  // })



  const onDeleteHandler = ()=>{
     try {
                Swal.fire({
                    title: "Are Your Sure To Delete This Section", 
                    showCancelButton: true,
                    icon:'question',
                    confirmButtonText: "Delete", 
                  }).then(async(result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                          removeHandler()
                        
                    } else if (result.isDenied) {
                    //   Swal.fire("Changes are not saved", "", "info");
                    }
                  });
            } catch (error) {
                toast.error(error.message)
            }
  }

    return <>
  

             <div className="py-5">
                            <div className="mb-3">
                              <label htmlFor={Titlename}>Title </label>
                                <Field id={Titlename} as="select" name={Titlename}  className='w-full border-primary border outline-none rounded-md px-3 py-3'   >


                                <option  value={''} > Select   </option>
                            {

SectionsTitles.length>0 &&SectionsTitles.map((cur,i)=>{
                                return <option key={i} value={cur}>{cur}</option>
                              })
                            }

                                </Field>
                                <ErrorMessage name={Titlename} className='text-red-500' component={'p'} />
                            </div>
                            <div className="mb-3">
                                <MarkDownCustomEditor value={conent_default_value}  setFieldValue={setFieldValue} Contentname={Contentname}  />
                                <ErrorMessage name={Contentname} className='text-red-500' component={'p'} />

                            </div>
                            <div className="mb-3">
                                <button type='button' onClick={onDeleteHandler} className=' p-2 bg-red-600 text-white cursor-pointer rounded-md flex items-center justify-center gap-x-2'> <CiTrash />  <span>Remove</span> </button>
                            </div>


             </div>


    </>
}


const ShowPreviewImages=({previews_images,removed_image,setFieldValue})=>{
    const onDeleteHandler=(public_id)=>{
         const images = [...removed_image,public_id]
            setFieldValue("removed_image",images)
            
    }
    const filerted_data = previews_images.filter((cur,i)=>{
        return !removed_image.includes(cur.public_id)
    })


    return <>
    
    {filerted_data && filerted_data.length>0 && <>    
                        <div className="grid  grid-cols-3 xl:grid-cols-5">
                        {
                        filerted_data.map((cur,i)=>{
                            return  <div key={i} className=" w-[90%] xl:1/2 2xl:w-1/3 mx-auto   py-3 flex items-center justify-center relative">
                            <Image  src={cur.uri} alt={cur.public_id} width={1000} height={1000} />
                            <button type='button' onClick={()=>onDeleteHandler(cur.public_id)} className='text-2xl p-1 text-black bg-white rounded-full shadow absolute top-[12px] right-[-4px] cursor-pointer'><RxCross2/></button>
                        </div>
                        })
                    }

                        </div>
                        </>
    }
    </>
}