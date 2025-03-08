"use client";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserSlicePath } from '../redux/slices/UserSlice';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const AuthTemplate = ({children}) => {


    const user= useSelector(UserSlicePath)
    const [loading,setLoading]  = useState(true)
    const router = useRouter()

    useEffect(()=>{
        if(user && user.email){
            router.push('/dashboard')
            
        } else{
            // redirect to login page
            setLoading(false)
        }

         // cleanup function
        return () => {
            // any cleanup code goes here
        }
    },[])
    if(loading){
        return <div className="min-h-screen flex items-center justify-center w-full">
            <Loader/>
        </div>
    }

  return (
    <>
        {children}
    </>
  )
}

export default AuthTemplate