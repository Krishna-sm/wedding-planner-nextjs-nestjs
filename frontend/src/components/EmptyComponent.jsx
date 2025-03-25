import Image from 'next/image'
import React from 'react'
import EMptyImage from '@/assets/images/empty.jpg'
const EmptyComponent = () => {
  return (
    <>
            <div className="min-h-[50vh] col-span-5 w-full bg-white flex-col flex items-center justify-center">
                <Image src={EMptyImage} width={1000} height={1000} alt='empty-image' className='w-1/2 mx-auto' /> 
            </div>
    </>
  )
}

export default EmptyComponent