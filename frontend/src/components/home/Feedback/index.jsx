"use client";
import React from 'react'
import  './style.css' 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {faker} from '@faker-js/faker'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
 

// import required modules
import { Pagination,Navigation,Autoplay } from 'swiper/modules';
const FeedbackSection = () => {
  return (
    <>
        <section id="Feedbacksection" className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
  <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 className="sm:w-2/5 text-gray-900 font-psmbold title-font text-2xl mb-2 sm:mb-0">Our Reviews</h1>
       
      
      </div>
    <div className=" ">

    <Swiper
       
        slidesPerView={1} 
        breakpoints={{
            640: {
                slidesPerView: 1,
              },
            
            1024: {
                slidesPerView: 2,
              },
            
            1440: {
                slidesPerView: 3,
              },
        }}

        spaceBetween={30}
        
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets:true
          }}
          loop={true}
          navigation={true}
        modules={[Pagination,Navigation,Autoplay]}
        className="mySwiper"
      >
       {
        Array(5).fill(null).map((cur,i)=>{
            return <SwiperSlide key={i}>
                <Card  />
            </SwiperSlide>
        })
       }
      </Swiper>

      
    </div>
  </div>
</section>
    </>
  )
}

export default FeedbackSection


const Card = ()=>{
    return <>
 <div className=" w-full">
        <div className="h-full  w-full  p-8 rounded">
          
          <p className="leading-relaxed mb-6 text-sm lg:text-base">{faker.lorem.paragraph()}</p>
          <a className="inline-flex items-center">
            <img alt="testimonial" src={faker.image.avatar()} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font text-base lg:font-medium text-gray-900">{faker.person.firstName()}</span>
              <span className="text-gray-500 text-xs lg:text-sm">{faker.person.jobTitle()}</span>
            </span>
          </a>
        </div>
      </div>
    </>
}