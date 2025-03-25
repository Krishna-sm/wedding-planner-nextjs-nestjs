"use client";
import Image from 'next/image'
import React from 'react'
import LogoImage from '@/assets/images/logo.png'
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { UserSlicePath } from '@/app/redux/slices/UserSlice';
import { useMainContext } from '@/context/MainContext';
import ProfileButton from './auth/ProfileButton';
import { IoMdMenu } from "react-icons/io";
import { toggleSidebar } from '@/app/redux/slices/SidebarSlice';
import LogoComponent from './reuseable/LogoComponent';
import { usePathname } from 'next/navigation';
import { private_routes } from '@/utils/constant';

const Header = () => {

  const user = useSelector(UserSlicePath)
  const {logoutHandler} = useMainContext()
  const dispatch = useDispatch()
  const pathame = usePathname()

  return (
    <>
           <header className="text-gray-600 body-font">
  <div className="container mx-auto flex  p-5  items-center">
    <div className="flex items-center justify-center gap-x-2">
 {pathame && private_routes.includes(pathame)&&   <button onClick={()=>dispatch(toggleSidebar())} className='text-3xl text-black lg:hidden'> 
    <IoMdMenu/> </button>}
        <LogoComponent/> 
    </div>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href={'/'} className="mr-5 text-black hover:text-gray-900">Home</Link> 
    </nav>
   {
    user && user.email ?
 
      <ProfileButton/>
    :
 <Link href={'/login'} className=" outline-none border-none px-6 py-3 font-pmedium bg-indigo-500 cursor-pointer text-white rounded-sm flex items-center justify-center gap-x-2">
 <span>Login</span> <FaArrowRight/>

</Link>
   }
  </div>
</header>

    </>
  )
}

export default Header