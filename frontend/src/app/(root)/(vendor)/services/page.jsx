import React from 'react'
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
const VendorService = () => {
  return (
    <>
                <div className="container">
                        <BreadCrums text={'Vendor Services'} />
                      
                      <div className="grid  mb-3 grid-cols-1 xl:grid-cols-3 gap-y-4 gap-x-10">
                    <div className="col-span-1">

                            <Select>
                            <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                            </SelectContent>
                            </Select>

                    </div>
                    <div className="col-span-1">


                            <Select>
                            <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="apple">Active</SelectItem>
                            <SelectItem value="banana">Un Active</SelectItem> 
                            </SelectGroup>
                            </SelectContent>
                            </Select>

                    </div>
                    <div className="col-span-1">
                        <div className=" border rounded-md  px-4 flex items-center">
                        <input type="text" className="w-full py-2 outline-none " placeholder='Search' />
                        <CiSearch className='text-3xl'/>
                        </div>
                    </div>
                      </div>

                      <div className="mb-3 flex items-end justify-end">
                            <Link href={'/services/create'} className="px-4 py-2 bg-indigo-500 cursor-pointer outline-none rounded-md text-white flex items-center justify-center gap-x-2">
                                Add <GoPlus/>
                            </Link>
                      </div>

                            <ShowData/>
                    </div>     
    </>
  )
}

export default VendorService