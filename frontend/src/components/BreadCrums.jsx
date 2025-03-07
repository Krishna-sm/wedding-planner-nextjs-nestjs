"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const BreadCrums = ({text}) => {
    const pathname = usePathname()
  return (
    <div className='   w-full  pt-10 px-2  '>
        <h1 className='font-psmbold text-4xl'>{text}</h1>
        <ul className="flex items-center py-4 gap-x-2">
            <li>
                <Link href={'/dashboard'} className='text-indigo-800'>Home</Link>
            </li>
            <li>{pathname} </li>
        </ul>
    </div>
  )
}

export default BreadCrums