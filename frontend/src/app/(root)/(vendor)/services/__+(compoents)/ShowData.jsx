"use client";
import { useDeleteServiceByIdMutation, useFetchAllServicesQuery } from "@/app/redux/queries/VendorService"
import ErrorComponent from "@/components/ErrorComponent"
import Loader from "@/components/Loader"
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
  import { CiEdit,CiTrash  } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ShowData = ({status,Category,search}) => {
  const searchQuery= useSearchParams()

  const page = parseInt(searchQuery.get('page')) >1 ?  parseInt(searchQuery.get('page')):1
const {data,isLoading,isError,error,isFetching} = useFetchAllServicesQuery({page,Category})
const router = useRouter()

const onPreviousClickHandler =()=>{
 
  if(page<=1) return;

  router.push(`/services?page=${page-1}`)
}
const onNextClickHandler =()=>{
 
  if(!data.has) return;

  router.push(`/services?page=${page+1}`)
}
 
      if(isError){
        console.log(error)
        return <ErrorComponent/>
      }
      if(isLoading){
        return <div className="min-h-[50vh] bg-white px-10 flex items-center justify-center rounded-md shadow">
          <Loader/>
        </div>
      }

      const filter_data_based_on_status = data?.data?.filter((cur,i)=>{
        if(status=="All"){
          return true
        }
        else if(status=="published"){
          return cur.isPublish===true
        }
    
          return cur.isPublish===false
  
      }).filter((data,index)=>{
        return data.title.toLowerCase().includes(search.toLowerCase())
      })

  return (

    <>
            <div className="container bg-white py-10 px-4 rounded-md mt-10">
            <Table>
      <TableCaption>A list of your Services.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead className="text-right">Image</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {
        isFetching ? <>
         <TableRow>
            <TableCell colSpan={10} className="font-medium text-center">
              <CgSpinner className="animate-spin" />
              </TableCell> 
          </TableRow>
        </>:<>
        { filter_data_based_on_status && filter_data_based_on_status.length>0 ? filter_data_based_on_status.map((cur,i) => (
       <Card data={cur}  key={i} index={i} />
        )):
            <>
               <TableRow>
            <TableCell colSpan={10} className="font-medium text-center">No Service Yet</TableCell> 
          </TableRow>
            </>
        }
        </>
       }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10} className="font-medium text-end bg-white">
           <div className="flex w-full  items-center justify-end">
           <button onClick={onPreviousClickHandler} disabled={page==1} className="bg-indigo-500 py-2 px-4 rounded-sm mx-2 text-white inline-flex items-center justify-center gap-x-2 disabled:bg-indigo-400 cursor-pointer">
             <IoIosArrowBack/>   <span>Prev </span>
            </button> 
            <button onClick={onNextClickHandler} disabled={!data.has} className="bg-indigo-500 py-2 px-4 rounded-sm mx-2 text-white inline-flex items-center justify-center gap-x-2 disabled:bg-indigo-400 cursor-pointer">
             <span>Next</span><IoIosArrowForward/>
            </button>
           </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
            </div>
    </>
  )
}

export default ShowData


const Card =({data:cur,index})=>{

const [DeleteFn,DeleteFnResponse] = useDeleteServiceByIdMutation()


 const DeleteHandler =()=>{
        try {
            Swal.fire({
                title: "Are Your Sure To Delete Service", 
                showCancelButton: true,
                icon:'question',
                confirmButtonText: "Delete", 
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                        const {data:Data ,error} = await DeleteFn(cur._id) 
                            if(error){
                                toast.error(error.message)
                                Swal.fire("Error!", error.message, "error");
                                return
                            }
                            Swal.fire("Success!", Data.msg, "success");


                } 
              });
        } catch (error) {
            toast.error(error.message)
        }
    }




  return   <TableRow  >
  <TableCell className="font-medium">{index+1}</TableCell>
  <TableCell>{cur.title}</TableCell>
  <TableCell>{cur.budget}</TableCell>
  <TableCell className="text-right w-[100px]">
 {cur?.images &&   <img src={cur?.images} alt="service" className="" />}
    </TableCell>
  <TableCell className="text-right">{cur.isPublish?
      <>
      <span className="text-sm Publish text-green-700 bg-green-100 px-4 py-1 rounded-full">
        Publish
      </span>
      </>
  :
  <>
    <span className="text-sm Publish text-red-700 bg-red-100 px-4 py-1 rounded-full">
        UnPublish
      </span>
      </>
}</TableCell>
<TableCell className="text-right flex justify-end">
    <Link href={`/services/edit/${cur._id}`} className="text-xl cursor-pointer px-4 py-4 rounded-sm bg-blue-700 text-white hover:bg-blue-800  ">
      <CiEdit/>
    </Link>
    <button disabled={DeleteFnResponse.isLoading} onClick={DeleteHandler} className="text-xl cursor-pointer px-4 py-4 rounded-sm bg-red-700 text-white hover:bg-red-800 ml-4 disabled:bg-red-900">
      <CiTrash/>
    </button>
  </TableCell>
</TableRow>
}