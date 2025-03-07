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
const Categories = () => {
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
        <TableRow>
        <TableCell className="font-medium">1</TableCell>
        <TableCell>Makup</TableCell>
        <TableCell>
            <span className="inline-flex items-center px-2 py-1 text-lg font-arial leading-tight text-green-600 bg-green-100 rounded-full">
                Active
            </span>
        </TableCell>
        <TableCell>
            <img alt="service" className=" w-12 xl:w-24  h-12 xl:h-24 object-cover object-center rounded-full" src="https://dummyimage.com/201x201" />
        </TableCell>

        <TableCell className="text-right">
        <Link href={`/categories/${1}/edit`} className="px-4 py-2 bg-teal-500 font-pregular text-white rounded-sm shadow ml-2">Edit</Link>
            <Link href={`/categories/${1}/delete`} className="px-4 py-2 bg-red-500 font-pregular text-white rounded-sm shadow ml-2">Delete</Link>
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>

                                    </div>

             </div>
    </>
  )
}

export default Categories