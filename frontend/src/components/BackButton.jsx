"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = () => {

    const router = useRouter()
  return (
    <>
        <button onClick={()=>router.back()} className='text-3xl border-primary border p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'><IoIosArrowRoundBack/></button>
    </>
  )
}

export default BackButton