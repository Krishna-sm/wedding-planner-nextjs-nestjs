import { useDeleteCategoryMutation } from '@/app/redux/queries/AdminCategory'
import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
const CategoryTableCard = ({data,index}) => {
    const [DeleteFn,DeleteResponse] = useDeleteCategoryMutation()

    const DeleteHandler =()=>{
        try {
            Swal.fire({
                title: "Are Your Sure To Delete Category", 
                showCancelButton: true,
                icon:'question',
                confirmButtonText: "Delete", 
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                        const {data:Data ,error} = await DeleteFn(data._id) 
                            if(error){
                                toast.error(error.message)
                                Swal.fire("Error!", error.message, "error");
                                return
                            }
                            Swal.fire("Success!", Data.msg, "success");


                } else if (result.isDenied) {
                //   Swal.fire("Changes are not saved", "", "info");
                }
              });
        } catch (error) {
            toast.error(error.message)
        }
    }



  return (
    <>
        <TableRow >
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 text-lg font-arial leading-tight ${data.isPublic? 'text-green-600 bg-green-100 ':'text-red-600 bg-red-100 '}rounded-full`}>
                        {
                            data.isPublic?'Active':'Inactive'
                        }
                    </span>
                </TableCell>
                <TableCell>
                    <Image width={1000} height={1000} alt={data.name} className=" w-12 xl:w-24  h-12 xl:h-24 object-cover object-center rounded-full" src={data?.image?.image_uri} />
                </TableCell>
        
                <TableCell className="text-right">
                <Link href={`/categories/${data._id}/edit`} className="px-4 py-2  cursor-pointer bg-teal-500 font-pregular text-white rounded-sm shadow ml-2">Edit</Link>
                    <button disabled={DeleteResponse.isLoading} onClick={DeleteHandler}   className="px-4 py-2 cursor-pointer bg-red-500 font-pregular text-white rounded-sm shadow ml-2">
                        {
                            DeleteResponse.isLoading? <CgSpinner className="animate-spin text-white"/> : 'Delete'
                        }
                    </button>
                </TableCell>
                </TableRow>
    </>
  )
}

export default CategoryTableCard