import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { CgSpinner} from 'react-icons/cg'

const CustomButton = ({label,isLoading,className,...props}) => {
  return (
    <>
            <button disabled={isLoading} {...props} className={`flex w-full py-3 text-white rounded-sm shadow-2xl cursor-pointer disabled:bg-indigo-800 items-center justify-center gap-x-2  bg-indigo-600 ${className}`}>
                <span>{label}</span> {isLoading?  <CgSpinner className='text-xl animate-spin'/> :<FaArrowRight className='text-xl'/>}
            </button>
    </>
  )
}

export default CustomButton