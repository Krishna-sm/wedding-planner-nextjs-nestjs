"use client";
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'  
const ServiceCard = ({data}) => {
  const { slug} = useParams()
  return (
    <>
         <Link href={`/service/${slug}/${data.slug}`}  id='service_card' className="p-4  sm:mb-0 mb-6 border border-transparent hover:border-logo transition-all duration-300 hover:rounded-2xl">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full hover:scale-105 transition-all duration-300" src={data.images} />
        </div>
        <h2 className="text-xl font-pmedium title-font text-gray-900 mt-5">{data.title}</h2>
        <p className="text-base leading-relaxed mt-2">{data.desc.substring(0,200)}...</p>
        

            <p className='text-xl font-psmbold px-2 py-3'> &#8377; {data.budget}/- <del className='text-red-600 text-sm'>
            {data.budget+(data.budget/10)}/-
              </del> </p> 
              {/* <Rating   onClick={()=>{}} emptyColor='#FF4500' className='flex' ratingValue={5} readonly  /> */}


      </Link>
     
    </>
  )
}

export default ServiceCard