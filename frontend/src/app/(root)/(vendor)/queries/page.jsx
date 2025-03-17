"use client";
import BreadCrums from '@/components/BreadCrums'
import React, { useState } from 'react'
import ShowData from './__+(components)/ShowData'
import ShowQueriesonRange from './__+(components)/ShowQueriesonRange'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusArray } from '@/utils/constant.vendor'
import { CiSearch } from 'react-icons/ci';
const QueriesPage = () => {

  const [search,setSearch] = useState('')

  return (
    <>
          <BreadCrums text={'Queries'} />


    <div className="grid grid-cols-1 gap-x-5 gap-y-5  xl:grid-cols-3">
    <div className="mb-3 col-span-1">
<Select>
        <SelectTrigger className=" w-full bg-white">
        <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
      {
        StatusArray.map((cur,i)=>{
          return <SelectItem key={i} value={cur}>{cur}</SelectItem>
        })
      }
        </SelectContent>
        </Select>
</div>
        <div className="mb-3 col-span-1 "> 
          <ShowQueriesonRange/>
        </div>

        <div className="col-span-1 ">
           <div className=" border rounded-md  px-4 flex items-center bg-white">
                                  <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="w-full py-2 outline-none " placeholder='Search' />
                                  <CiSearch  className='text-3xl'/>
                                  </div>
        </div>

    </div>



          <div className=" px-3 2xl:px-10 py-10 bg-white">
          <ShowData/>
          </div>


    </>
  )
}

export default QueriesPage