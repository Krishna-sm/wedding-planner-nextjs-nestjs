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
 

export default function ShowData() {
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
        {Array(10).fill(null).map((cur,i) => (
          <Card key={i} />
        ))}
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

 const Card =()=>{
  return <>
   <TableRow >
            <TableCell className="font-medium">{faker.number.bigInt()}</TableCell>
            <TableCell className="text-right">{faker.person.fullName()}</TableCell>
            <TableCell className="text-right">{faker.science.unit().name}</TableCell>
            <TableCell className="text-right">{faker.commerce.price()}</TableCell>
            <TableCell className="text-right">
            <div className="flex items-center justify-end w-full gap-x-2 ">
                <ViewQuery/>
            </div>
            </TableCell>
          </TableRow>
</>

 }



 