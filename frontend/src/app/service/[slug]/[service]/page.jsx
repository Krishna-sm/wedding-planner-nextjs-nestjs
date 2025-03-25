"use client";
import React from 'react'
import ServiceSlider from './__+(components)/Slider'
import { useParams } from 'next/navigation'
import MarkdownViewCompoents from '@/components/reuseable/MarkdownViewComponents';
import EnquieryForm from './__+(components)/EnquieryForm';
import {faker} from '@faker-js/faker'
import { FaPhone } from 'react-icons/fa6';

const ServiceView = () => {
    const {slug,service} = useParams()
  return (
    <>
                   <div className="py-10 w-full">
                   <ServiceSlider/>
                   </div>
                <div className="container mx-auto py-10 grid lg:grid-cols-3 gap-y-7 items-start">
                    <div className=" col-span-1 lg:col-span-2">
                        <MarkdownViewCompoents data={`# Hello Krishna Sir`} />
                    </div>
                    <div className="col-span-1 sticky top-0">
                               <EnquieryForm/>     

                               <div className="mt-3">
                                <div className="card border w-[98%] lg:w-[90%] mx-auto   rounded-sm py-4 flex items-start justify-between bg-white px-3 gap-x-3">
                                    <div className="w-[20%]">
                                        <img src={faker.image.avatar()} alt="" className=' rounded-full' />
                                    </div>
                                    <div className=" w-full">
                                            <h3>{faker.person.fullName()}</h3>
                                            <h3>@{faker.person.firstName()}</h3>
                                            <button className="bg-logo w-full flex items-center justify-center gap-x-2 py-2 mt-3 text-white">
                                                <span>Call Now</span>
                                                <FaPhone className='text-xl'/>
                                            </button>
                                    </div>
                                </div>
                               </div>
                    </div>
                </div>
    
    </>
  )
}

export default ServiceView