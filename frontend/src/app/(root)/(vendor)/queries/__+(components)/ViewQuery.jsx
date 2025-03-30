import React from 'react'
import { FaEye } from 'react-icons/fa6' 
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet" 
import { faker } from '@faker-js/faker'
import VerifiedData from '@/components/reuseable/VerifiedData'
import moment from 'moment'
import AttendQuery from './AttendQuery' 
import ContactInfomation from './ContactInfomation'
import { useFetchEnquryByIdQuery } from '@/app/redux/queries/VendorQUery'
import Loader from '@/components/Loader'
import ErrorComponent from '@/components/ErrorComponent'

import DefaultPic from '@/assets/images/default_icon.avif'
import  Image from 'next/image'

const ViewQuery = ({id}) => {

  const {data,isError,isLoading} = useFetchEnquryByIdQuery(id)

    if(isLoading){
        return  <Loader/>
      }
    
      if(isError){
       return  <ErrorComponent/>
      }



  // const status = 'COMPLETE'

  return (
    <>
        
              <Sheet>
  <SheetTrigger className="gap-x-2 flex items-center justify-center px-5 py-2 bg-indigo-500 text-white rounded  shadow cursor-pointer"> 
              <FaEye/>
              <span>View</span> 
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Order ID #{data?.id}</SheetTitle>
      <SheetDescription className={` text-center py-3 ${data.status ==='PENDING'?'text-yellow-800 bg-yellow-100':
        data.status ==='PROCESS'?'text-orange-700 bg-orange-100':data.status ==='COMPLETE'?'text-green-500 bg-green-100':'text-red-500 bg-red-100 '} capitalize`}>
      {data.status}
      </SheetDescription>
      <section className="mb-3   flex items-center justify-center py-10 flex-col  ">
    
                    {data.user_avatar ?<div className="mb-3 w-[200px] h-2[200px] rounded-full object-cover overflow-hidden border-4 border-double border-indigo-500">
                    <img
                        src={data.user_avatar.uri}
                        className='hover:scale-150 transition-all duration-300'
                />
                    </div>:
                      <>
                      <div className="mb-3 w-[200px] h-2[200px] rounded-full object-cover overflow-hidden border-4 border-double border-indigo-500">
                    <Image
                    width={1000}
                    height={1000}
                    alt="dasd"
                        src={DefaultPic}
                        className='hover:scale-150 transition-all duration-300'
                />
                    </div>
                      
                      </>
                    }
                <h1 className='text-xl font-psmbold flex gap-x-2 items-center justify-center'>{data.name} <VerifiedData status={data.user_emailVerified ??false} /> </h1>

                <div className="mb-3 text-center">
                    <p className='text-sm'>Order Date: {moment(data.date).startOf('day').fromNow()  }</p>
                <div className="py-4 flex items-center justify-center">
                <span className='text-2xl bg-indigo-600 text-white px-4 py-1 my-3  mx-auto font-pmedium  text-center'> &#8377;{data.budget}</span> <ContactInfomation 
                address={data.address}
                email={data.email}
                name={data.name}
                phone={data.phone}
                />
                </div>
                </div>

                <div id="no-scrollbar" className="mb-3 h-[40vh] overflow-auto">
                <div className="mb-3 w-full px-4">
                      <p className="font-pmedium text-lg">Category </p>
                      <p className='py-2 font-pregular'>{data.category}</p>
                    </div>

                    <div className="mb-3 w-full px-4">
                    <div className="mb-3 w-full px-4">
                      <p className="font-pmedium text-lg">Service </p>
                      <p className='py-2 font-pregular'>{data.service}</p>
                    </div>

                    <div className="mb-3 w-full px-4">
                      <p className="font-pmedium text-lg">Message </p>
                      <p className='py-2 font-pregular'>{data.message}</p>
                    </div>


                        <div className="mb-3 py-5">
                      <AttendQuery id={data.id} status={data.status} remark={data.remark} />
                        </div>


                    </div>
                </div>
           
                  










               </section>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </>
  )
}

export default ViewQuery