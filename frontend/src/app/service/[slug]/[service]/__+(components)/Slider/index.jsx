"use client"; 
import './style.css'
import React  from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
const ServiceSlider = ({images}) => {
  return (
    <>
           <section className='h-[50vh] object-contain overflow-hidden'>
           <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets:true
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper "
      >
       {
        images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={image} className='w-full h-full object-cover' />
          </SwiperSlide>
        ))
       }
      </Swiper>
           </section>
    </>
  )
}

export default ServiceSlider