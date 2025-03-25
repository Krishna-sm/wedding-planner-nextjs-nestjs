"use client";
import { usePopularCateriesQuery } from '@/app/redux/queries/PublicQuery'
import React from 'react'
import Loader from '../Loader'
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import CategoryCard from './CategoryCard';
import ErrorComponent from '../ErrorComponent';
import EmptyComponent from '../EmptyComponent';

const CategoriesSections = () => {

    const {data,isError,isLoading} = usePopularCateriesQuery()

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
  <div className="container px-5 py-10 mx-auto">
    <div className="mb-3 flex items-end justify-end">
          <Link href={'/all-categories'} className='inline-flex items-center justify-center gap-x-2 font-pmedium text-logo'> <span>View More</span> <FaArrowRight/> </Link>
    </div>
    
    <div className="grid grid-cols-1 gap-x-3  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 px-2 lg:px-0 py-3">

                {
                    data && data.length>0 ?data.map((cur,i)=>{
                        return   <CategoryCard data={cur} key={i} />
                     
                    }) :<EmptyComponent/>
                }


    </div>
  </div>
</section>
    </>
  )
}

export default CategoriesSections

