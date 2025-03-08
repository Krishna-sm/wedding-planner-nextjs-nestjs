"use client";
import BreadCrums from '@/components/BreadCrums'
import Link from 'next/link'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useGetAllCategoriesQuery } from '@/app/redux/queries/AdminCategory'
import Loader from '@/components/Loader'
import ErrorComponent from '@/components/ErrorComponent'
import Image from 'next/image';
import CategoryTableCard from './__+(components)/CategoryTableCard';
const Categories = () => {

        const {data,isLoading,isError} = useGetAllCategoriesQuery()

        if(isLoading){
            return <Loader/>
        }
        if(isError){
            return <ErrorComponent/>
        }
        console.log(data)


  return (
    <>
             
             <div className="mb-3  container mx-auto  ">
                        <BreadCrums text={"Category Page"} />

                              <div className="flex items-end   w-full justify-end">
                              <Link href={'/categories/create'} className="px-4 py-2 border border-primary text-primary rounded-sm shadow cursor-pointer  ">Create</Link>
                              </div>




                                    <div className="px-10 bg-white py-5 w-full overflow-hidden">
                                    <Table className={' '}>
    <TableCaption>A list of Service that we are providing.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Image</TableHead>
        <TableHead className="text-right">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {
            data && data.length>0 ? data.map((cur,i)=>{
                return <CategoryTableCard data={cur} index={i} key={i} />
            }):
            <TableRow>
                <TableCell colSpan={5} className="text-center   font-psmbold text-xl text-gray-400">No Data Found</TableCell>
            </TableRow>
        }
    </TableBody>
    </Table>

                                    </div>

             </div>
    </>
  )
}

export default Categories