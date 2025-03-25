import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoComponent = () => {
  return (
    <>
     <Link href={'/'}>
     <img src={'/logo.png'}  alt='logo' className=' w-[90%] sm:w-[40%] xl:w-[30%]' />
     </Link>
        </>
  )
}

export default LogoComponent