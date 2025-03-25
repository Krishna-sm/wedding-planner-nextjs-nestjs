"use client";
import React from 'react'
import { useAlllCateriesQuery } from '../redux/queries/PublicQuery';
import ErrorComponent from '@/components/ErrorComponent';
import Loader from '@/components/Loader';
import CategoryCard from '@/components/home/CategoryCard';
import EmptyComponent from '@/components/EmptyComponent';

const AllCategoriesPage = () => {
    const {data,isError,isLoading} = useAlllCateriesQuery()
  
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
     <div className="container mx-auto">
     <div className=" grid grid-cols-1 gap-x-3  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 px-2 lg:px-0 py-3">
      
      {
          data && data.length>0 ?data.map((cur,i)=>{
              return   <CategoryCard data={cur} key={i} />
           
          }) :<EmptyComponent/>
      }


</div>
     </div>
    </>
  )
}

export default AllCategoriesPage