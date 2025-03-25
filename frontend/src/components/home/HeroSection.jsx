"use client";
import React from 'react'
import { MdCallMade } from "react-icons/md";
import Typewriter from 'typewriter-effect';
const HeroSection = () => {
  return (
    <>
            
          <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 pt-24 lg:py-24 gap-y-5 md:flex-row flex-col-reverse items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
        <Typewriter
  options={{
    strings: ['Wedding Planner', 'Book Your Marrige Venue','Get Ready To Meet '],
    autoStart: true,
    wrapperClassName:' sm:text-4xl md:text-6xl text-3xl font-pbold',
    cursorClassName:'text-logo text-4xl',
    loop: true,
  }}
/>
        <br className="hidden lg:inline-block" /> 
      </h1>
      <p className="mb-8 leading-relaxed font-pregular">Shubh Vivah is a wedding planning service that aims to transform the wedding planning experience for Indian couples, offering a range of services including vendor management, event flow management, decor planning, guest management, and more, with a focus on creating memorable and personalized celebrations.</p>
      <div className="   w-full">
        <button className="inline-flex text-white  bg-logo border-0 py-2 px-6 focus:outline-none hover:bg-[#ff4000] rounded text-lg items-center gap-x-3"><span>Book Now</span> <MdCallMade/> </button>
 
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://www.athiniphotos.in/wp-content/uploads/2022/11/AP_M9190-Jaiganesh-Brindha-Engagement-scaled.jpg" />
    </div>
  </div>
</section>
    </>
  )
}

export default HeroSection