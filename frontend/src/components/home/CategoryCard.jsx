import Link from 'next/link'
import React from 'react'


const CategoryCard =({data})=>{
    return <Link href={`/service/${data.slug}`} className=" p-2 xl:p-4 w-full hover:border hover:rounded-sm hover:shadow transition-all duration-300 inset-2 border border-transparent hover:border-logo cursor-pointer">
    <div className="h-full flex flex-col items-center text-center">
      <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={data.image.image_uri} />
      <div className="w-full">
        <h2 className="title-font text-lg text-gray-900 capitalize font-pmedium">{data.name}</h2>
        {/* <h3 className="text-gray-500 mb-3">UI Developer</h3> */}
        <p className="mb-4 text-start">{data.desc.substring(0,100)}...</p>
       
      </div>
    </div>
  </Link>
}
export default CategoryCard