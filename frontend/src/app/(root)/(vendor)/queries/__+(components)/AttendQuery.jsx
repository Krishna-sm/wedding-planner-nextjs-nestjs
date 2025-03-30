"use client";
import React from 'react'
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import * as yup from 'yup'
import { ErrorMessage, Field, Formik } from 'formik'
import CustomButton from '@/components/CustomButton'
import { StatusArray } from '@/utils/constant.vendor';
import { useUpdateEnqueryByIdMutation } from '@/app/redux/queries/VendorQUery';
   import {toast} from 'react-toastify'
const AttendQuery = ({status,remark,id}) => {
  const [updateFn,UpdateFnResponse] = useUpdateEnqueryByIdMutation()

    const initialValues={
        'status':status,
        'remark':remark,
    }
    const validationSchema = yup.object({
        status: yup.string().required('Status is required')
        .oneOf(StatusArray),
        remark: yup.string().required('Reason is required'),
    })
    const onSubmitHandler =async(value,helpers)=>{
      try{

        const {data,error} = await updateFn({id,data:value})
        if(error){
          throw new Error(error.message)
        }
        toast.success(data.msg)

      }
      catch(e){
        toast.error(e.message)
      }
    }

  return (
    <>
   <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
    {({handleSubmit,values,errors,setFieldValue})=>(
        <form  onSubmit={handleSubmit}>
             <div className="mb-3">
    <label htmlFor="status">Update Status</label>
 <Select  onValueChange={(val)=>setFieldValue('status',val)} defaultValue={values.status} >
      <SelectTrigger  className="w-full">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="PENDING">PENDING</SelectItem>
          <SelectItem value="PROCESS">PROCESS</SelectItem>
          <SelectItem value="COMPLETE">COMPLETE</SelectItem>
          <SelectItem value="REJECT">REJECT</SelectItem> 
        </SelectGroup>
      </SelectContent>
    </Select>
    <ErrorMessage className='text-sm text-red-500' name='status' component={'p'} />
    </div>
    <div className="mb-3">
        <label htmlFor="status">Update Reason</label>
        <Field as="textarea" name="remark" rows="4" className="w-full px-4 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Reason for updating status" />
    <ErrorMessage className='text-sm text-red-500' name='remark' component={'p'} />

    </div>
    <div className="mb-3">
        <CustomButton label={'Update Status'} isLoading={UpdateFnResponse.isLoading} />
    </div>
        </form>
    )}
   </Formik>
    </>
  )
}

export default AttendQuery