"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { IoIosArrowForward } from "react-icons/io";

import {MdOutlineContactSupport, MdOutlineSpaceDashboard} from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlicePath, toggleCollapse, toggleSidebar } from '../redux/slices/SidebarSlice';
import { UserSlicePath } from '../redux/slices/UserSlice';
import Loader from '@/components/Loader';
import { VscFeedback } from "react-icons/vsc";

import { GoGear } from "react-icons/go";

const CustomMenuItem = ({title,link,Icon})=>{
    const pathname = usePathname()
    return (
        <MenuItem
        active={pathname===link}
        style={{
            backgroundColor:pathname ===link?'#3f00ff':'',
            borderRadius:'5px',
            color:pathname === link?'white':'black',
            textDecoration:'none',
            padding:'10px 15px',
            transition:'background-color 0.3s ease',
            fontFamily:'Poppins-Medium'
    

        }}
        component={<Link href={link}/>} icon={<Icon className="text-3xl" />} >
                {title}
         
        </MenuItem>
    )
}

const RootTemplalate = ({children}) => {

  const {isToggle,isCollapsed} = useSelector(SidebarSlicePath)
  const user = useSelector(UserSlicePath)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    if(user && user.email){
      setLoading(false) 
    }else{
      router.push("/login")
    }
  },[user])

  if(loading){
    return <div className='min-h-screen w-full flex items-center justify-center'>
      <Loader/>
    </div>
  }


  return (
    <>
            <section className="flex items-start gap-x-4">

              <aside className='relative'>
              <Sidebar breakPoint='lg' collapsed={isCollapsed} toggled={isToggle} 
                onBackdropClick={()=>dispatch(toggleSidebar())}
              >
  <Menu className='min-h-screen py-10 bg-whitesmoke'>
    {/* <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu> */}
    <CustomMenuItem Icon={MdOutlineSpaceDashboard } link={'/dashboard'} title={'Dashboard'} />  
    {/* <CustomMenuItem Icon={MdOutlineSpaceDashboard } link={'/profile'} title={'Profile'} /> */}


            {user &&user?.role ==="user" ?<>
              <UserMenus/>
            </>: 
            user &&user?.role ==="admin"?<>
              <AdminMenus/>
            </>:
            user &&user?.role ==="vendor"?<>
                <VendorMenus/>
            </>:
            <>

            </>
            
            } 



  </Menu>
</Sidebar>
<button onClick={()=>dispatch(toggleCollapse())} className={`  
  p-1 text-xl border-black text-black border z-10 rounded-full absolute right-0 top-0 ${!isCollapsed?'rotate-180':''}
  `}>
  <IoIosArrowForward/> 
</button>
              </aside>

            <main className='w-full'>{children}</main>
            </section>
    </>
  )
}

export default RootTemplalate


const UserMenus=()=>{
  return <>
  <CustomMenuItem link={'/feedback'} title={'Feedback'}  Icon={VscFeedback }/>
  </>
}
const AdminMenus=()=>{
 return  <>
  <CustomMenuItem link={'/categories'} title={'Services'}  Icon={GoGear }/>
  
  </>
}
const VendorMenus=()=>{
 return  <>
  <CustomMenuItem link={'/services'} title={'Services'}  Icon={GoGear }/>
  <CustomMenuItem link={'/queries'} title={'Queries'}  Icon={MdOutlineContactSupport  }/>
 
 </>
}