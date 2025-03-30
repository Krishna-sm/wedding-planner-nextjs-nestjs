"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { faker } from '@faker-js/faker';
import { FaEye } from "react-icons/fa6";
import ViewQuery from "./ViewQuery";
import { useFetchAllEnquriesQuery } from "@/app/redux/queries/VendorQUery";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/ErrorComponent";
 

export default function ShowData({status='',search='',from=new Date(),to=new Date()}) {


  const {isLoading,data,isError,error} = useFetchAllEnquriesQuery({status,search,from:from.getTime(),to:to.getTime()})
  if(isLoading){
    return <div className="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  }

  if(isError){
   return <div className="min-h-screen flex items-center justify-center">
    {JSON.stringify(error)}
    </div>
  }
 

  return (
    <Table>
      <TableCaption>A list of your Queries.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className={'text-right className="text-right"'}>Name</TableHead> 
          <TableHead className="text-right">Service</TableHead>
          <TableHead className="text-right">Budget</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.data && data.data.length>0 ? data.data.map((cur,i) => (
          <Card key={i} data={cur} />
        ))
        :
        <></>
      
      }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

 const Card =({data})=>{
  return <>
   <TableRow > 
            <TableCell className="font-medium">{data._id}</TableCell>
            <TableCell className="text-right">{data.name}</TableCell>
            <TableCell className="text-right">{data.service.title}</TableCell>
            <TableCell className="text-right">{data.service.budget}</TableCell>
            <TableCell className="text-right">
            <div className="flex items-center justify-end w-full gap-x-2 ">
                <ViewQuery id={data._id} />
            </div>
            </TableCell>
          </TableRow>
</>

 }



 