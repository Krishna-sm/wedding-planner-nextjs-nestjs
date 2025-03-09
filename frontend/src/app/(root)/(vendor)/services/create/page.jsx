"use client";
import BackButton from '@/components/BackButton'
import BreadCrums from '@/components/BreadCrums'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik' 
import { toast } from 'react-toastify'
import * as yup from 'yup'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

import CustomButton from '@/components/CustomButton'; 
import { GoPlus } from 'react-icons/go';
import MarkDownCustomEditor from '@/components/reuseable/MarkdownCustomEditor';
import { SectionsTitles } from '@/utils/constant.vendor';
import { CiTrash } from "react-icons/ci";
import Swal from 'sweetalert2';

const CreateServicePge = () => {
//   const [CreateMutaitonFunction,CreateMutaitonResponse] = useCreateCategoryMutation()

  const initialValues = {
    name:'',
    desc:'',
    images:[],
    sections:[
      {
        title:'',
        content:''
      }
    ],
    keywords:''
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    desc: yup.string().required('Description is required'),
    image: yup.array().of(yup.mixed().required('Image is required')),
    sections: yup.array().of(
      yup.object().shape({
        title: yup.string().required('Title is required'),
        content: yup.string().required('Content is required'),
      })),
      keywords: yup.string().required('Keywords is required'),
        
  });

  const onSubmitHandler = async(values,helpers)=>{
    try {
      
      console.log("values",values)
      // helpers.resetForm()
      // const formData = new FormData()
      // formData.append('name', values.name)
      // formData.append('desc', values.desc)
      // formData.append('image', values.image)

    //   const {data,error} = await CreateMutaitonFunction(formData)
    //   if(error) {
    //     toast.error(error.message)
    //     return
    //   }
    //   toast.success(data.msg)
    //   console.log(data)

      // helpers.resetForm()


    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  return (
    <>
        <BackButton/>

        <BreadCrums text={'Add Service'} />


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
             <label htmlFor="category_image">Service Images <span className="text-red-500">*</span></label>

              <ImagePicker setFileValue={setFieldValue}  values={values.images} />
             </div>

             <div className="mb-3  w-full">
                           


                            <FieldArray
             name="sections"
             render={arrayHelpers => {
              const SectionValues= Object.values(SectionsTitles) 


              // const filterSection = SectionValues.filter((cur,i)=>{
              //   return !values.sections.find((curd)=>curd.title == cur)
              // })
            


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

                    //  <div key={index}>
                    //    <Field name={`sections.${index}`} />
                    //    <button
                    //      type="button"
                    //      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    //    >
                    //      -
                    //    </button>
                    //    <button
                    //      type="button"
                    //      onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                    //    >
                    //      +
                    //    </button>
                    //  </div>
             })
                 ) : (
                  <></>
                  //  <button type="button" onClick={() => arrayHelpers.push('')}>
                  //    {/* show this when user has removed all friends from the list */}
                  //    Add Section
                  //  </button>
                 )}
                 {/* <div>
                   <button type="submit">Submit</button>
                 </div> */}
 
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
              <CustomButton type="submit" isLoading={false} label={'Add Service'} />
             </div>

             
             
             </form>
          )}
   
    </Formik>

    </>
  )
}

export default CreateServicePge

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

Object.keys(SectionsTitles).length>0 &&Object.keys(SectionsTitles).map((cur,i)=>{
                                return <option key={i} value={SectionsTitles[cur]}>{cur}</option>
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