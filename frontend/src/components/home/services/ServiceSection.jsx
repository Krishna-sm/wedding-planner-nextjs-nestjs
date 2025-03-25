"use client";
import { usePopularServicesQuery } from '@/app/redux/queries/PublicQuery'
import ErrorComponent from '@/components/ErrorComponent'
import Loader from '@/components/Loader'
import React from 'react'
import ServiceCard from './ServiceCard'
import EmptyComponent from '@/components/EmptyComponent';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const ServiceSection = () => {

    const {isError,isLoading,data} = usePopularServicesQuery()


    
        if(isLoading){
          return <div className="min-h-[50vh] flex items-center justify-center">
             <Loader/>
          </div>
        }
    
        if(isError){
          return <div className="min-h-[50vh] flex items-center justify-center">
            <ErrorComponent/>
          </div>
        }
    
  return (
    <>
            <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col">
      {/* <div className="h-1 bg-gray-200 rounded overflow-hidden">
        <div className="w-24 h-full bg-indigo-500" />
      </div> */}
        
      <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 className="sm:w-2/5 text-gray-900 font-psmbold title-font text-2xl mb-2 sm:mb-0">Popular Services</h1>
       
      
      </div>
      <div className="mb-3 flex items-end justify-end">
                <Link href={'/service'} className='inline-flex items-center justify-center gap-x-2 font-pmedium text-logo'> <span>View More</span> <FaArrowRight/> </Link>
          </div>
    </div>
    <div className=" grid grid-cols-1 gap-x-3  md:grid-cols-2 lg:grid-cols-3   gap-y-6 px-2 lg:px-0 py-3">
                    {
                    data && data.length>0 ? data.map((cur,i)=>{
                        return <ServiceCard data={cur} key={i} />
                    })     :<EmptyComponent/>
                    }
    </div>
  </div>
</section>
    </>
  )
}

export default ServiceSection