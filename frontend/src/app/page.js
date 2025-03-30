import CategoriesSections from '@/components/home/CategoriesSections'
import FeedbackSection from '@/components/home/Feedback'
import HeroSection from '@/components/home/HeroSection'
import ServiceSection from '@/components/home/services/ServiceSection'
import Loader from '@/components/Loader'
import React, { Suspense } from 'react'

const IndexPage = () => {
  return (
    <>
    <HeroSection/>
    <Suspense fallback={<Loader/>}>
    <CategoriesSections/>
    </Suspense>
      
    <Suspense fallback={<Loader/>}>
    <ServiceSection/>
    </Suspense>
    <Suspense fallback={<Loader/>}>
    <FeedbackSection/>
    </Suspense>








    </>
  )
}

export default IndexPage