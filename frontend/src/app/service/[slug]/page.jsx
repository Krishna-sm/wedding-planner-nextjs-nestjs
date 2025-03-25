"use client";
import React,{use} from 'react' 
import Loader from '@/components/Loader'
import ErrorComponent from '@/components/ErrorComponent'
import ServiceCard from '@/components/home/services/ServiceCard'
import { useAllServicesBySlugQuery } from '@/app/redux/queries/PublicQuery';
import EmptyComponent from '@/components/EmptyComponent';

const AllServicesBySlug = (props) => {
  const params = use(props.params)
  const {data,isError,isLoading} = useAllServicesBySlugQuery(params.slug)
  
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
          <div className="container mx-auto py-10">
     <div className=" grid grid-cols-1 gap-x-3  md:grid-cols-2 lg:grid-cols-3   gap-y-6 px-2 lg:px-0 py-3">
      
      {
          data && data.length>0 ?data.map((cur,i)=>{
              return   <ServiceCard data={cur} key={i} />
           
          }) :<EmptyComponent/>
      }


</div>
     </div>
    </>
  )
}

export default AllServicesBySlug