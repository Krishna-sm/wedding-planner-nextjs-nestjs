"use client";
import React, { useState } from 'react'
import ShowData from './__+(compoents)/ShowData'
import BreadCrums from '@/components/BreadCrums'
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from 'next/link';
import { useFetchAllCategoriesServiceQuery } from '@/app/redux/queries/VendorService';
const VendorService = () => {


    const [status,setStatus] = useState("All")
    const [Category,setCategory] = useState("")
    const [search,setSearch] = useState('')

    
  

  const {data,isLoading} = useFetchAllCategoriesServiceQuery()
 
  return (
    <>
                <div className="container">
                        <BreadCrums text={'Vendor Services'} />
                      
                      <div className="grid  mb-3 grid-cols-1 xl:grid-cols-3 gap-y-4 gap-x-10">
                    <div className="col-span-1">

                            <Select  onValueChange={(val)=>{
                              setCategory(val)
                            }} defaultValue={Category}>
                            <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            
                            
                            {isLoading? <SelectItem defaultValue="">loading...</SelectItem>:  null}
                        {
                          !isLoading &&data.length>0&& data.map((cur,i)=>{
                            return <SelectItem key={i} value={cur._id}>{cur.name}</SelectItem>
                          })
                        }
                            </SelectGroup>
                            </SelectContent>
                            </Select>

                    </div>
                    <div className="col-span-1">


                            <Select onValueChange={(val)=>setStatus(val)} defaultValue={status}>
                            <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Status"  />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup >
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="UnPublish">Un Published</SelectItem> 
                            </SelectGroup>
                            </SelectContent>
                            </Select>

                    </div>
                    <div className="col-span-1">
                        <div className=" border rounded-md  px-4 flex items-center">
                        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className="w-full py-2 outline-none " placeholder='Search' />
                        <CiSearch  className='text-3xl'/>
                        </div>
                    </div>
                      </div>

                      <div className="mb-3 flex items-end justify-end">
                            <Link href={'/services/create'} className="px-4 py-2 bg-indigo-500 cursor-pointer outline-none rounded-md text-white flex items-center justify-center gap-x-2">
                                Add <GoPlus/>
                            </Link>
                      </div>

                            <ShowData status={status}  search={search} Category={Category}/>

                    </div>     
    </>
  )
}

export default VendorService