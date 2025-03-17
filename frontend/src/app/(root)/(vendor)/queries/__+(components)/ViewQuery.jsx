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
const ViewQuery = () => {

  const status = 'COMPLETE'

  return (
    <>
        
              <Sheet>
  <SheetTrigger className="gap-x-2 flex items-center justify-center px-5 py-2 bg-indigo-500 text-white rounded  shadow cursor-pointer"> 
              <FaEye/>
              <span>View</span> 
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Order ID #122245582</SheetTitle>
      <SheetDescription className={` text-center py-3 ${status ==='PENDING'?'text-yellow-800 bg-yellow-100':
        status ==='PROCESS'?'text-orange-700 bg-orange-100':status ==='COMPLETE'?'text-green-500 bg-green-100':'text-red-500 bg-red-100 '} capitalize`}>
      {status}
      </SheetDescription>
      <section className="mb-3   flex items-center justify-center py-10 flex-col  ">
    
                    <div className="mb-3 w-[200px] h-2[200px] rounded-full object-cover overflow-hidden border-4 border-double border-indigo-500">
                    <img
                        src={faker.image.avatar()}
                        className='hover:scale-150 transition-all duration-300'
                />
                    </div>
                <h1 className='text-xl font-psmbold flex gap-x-2 items-center justify-center'>{faker.person.fullName()} <VerifiedData status={true} /> </h1>

                <div className="mb-3 text-center">
                    <p className='text-sm'>Order Date: {moment(faker.date.past()).startOf('day').fromNow()  }</p>
                <div className="py-4 flex items-center justify-center">
                <span className='text-2xl bg-indigo-600 text-white px-4 py-1 my-3  mx-auto font-pmedium  text-center'> &#8377;{Math.floor(faker.commerce.price())}</span> <ContactInfomation/>
                </div>
                </div>

                <div id="no-scrollbar" className="mb-3 h-[40vh] overflow-auto">
                <div className="mb-3 w-full px-4">
                      <p className="font-pmedium text-lg">Category </p>
                      <p className='py-2 font-pregular'>Butiq Hall</p>
                    </div>

                    <div className="mb-3 w-full px-4">
                      <p className="font-pmedium text-lg">Service </p>

                        <ul className='list-decimal px-10'>
                          <li className="py-2 font-pregular">Catering</li>
                          <li className="py-2 font-pregular">Decoration</li>
                          <li className="py-2 font-pregular">Photography</li>
                          <li className="py-2 font-pregular">Transportation</li>
                          <li className="py-2 font-pregular">Venue Setup</li>
                        </ul>


                        <div className="mb-3 py-5">
                      <AttendQuery/>
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