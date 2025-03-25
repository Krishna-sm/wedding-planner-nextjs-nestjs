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
const ServiceSlider = () => {
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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
           </section>
    </>
  )
}

export default ServiceSlider