import React from 'react'
import { MdVerified } from "react-icons/md";

const VerifiedData = ({status=false}) => {
  return (
    <>
         {status &&   <MdVerified className='text-blue-600'/>}
    </>
  )
}

export default VerifiedData