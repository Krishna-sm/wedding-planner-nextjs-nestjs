import Image from 'next/image'
import React from 'react'
import LogoImage from '@/assets/images/logo.png'
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';

const Header = () => {
  return (
    <>
           <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image src={LogoImage} alt='logo' className=' w-[10%]' width={1000} height={1000} />
      <span className="ml-3 text-xl">SubhVivah</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href={'/'} className="mr-5 text-black hover:text-gray-900">Home</Link> 
    </nav>
    <Link href={'/login'} className=" outline-none border-none px-6 py-3 font-pmedium bg-indigo-500 cursor-pointer text-white rounded-sm flex items-center justify-center gap-x-2">
        <span>Login</span> <FaArrowRight/>
     
    </Link>
  </div>
</header>

    </>
  )
}

export default Header