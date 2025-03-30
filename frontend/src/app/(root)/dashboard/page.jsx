"use client";
import { UserSlicePath } from '@/app/redux/slices/UserSlice';
import React from 'react'
import { CiSquareInfo, CiUser } from 'react-icons/ci';
import { FaCircleUser } from 'react-icons/fa6';
import { MdCategory, MdDashboard } from 'react-icons/md';
import { RxGear } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const Dashboard = () => {

  const user = useSelector(UserSlicePath)
  const data = {
    "user":[
      { 
        heading:"Total Enquries",
        count:user?.dashboard?.total_enquries ?? 0,
        Icon:CiSquareInfo 
      }
    ],
    "vendor":[
      { 
        heading:"Total Services",
        count:user?.dashboard?.total_services ?? 0,
        Icon:RxGear
      },
      { 
        heading:"Total Enquries",
        count:user?.dashboard?.total_enquries ?? 0,
        Icon:CiSquareInfo 
      }
    ],
    "admin":[
      { 
        heading:"Total Users",
        count:user?.dashboard?.total_users ?? 0,
        Icon:CiUser 
      },
      { 
        heading:"Total Categories",
        count:user?.dashboard?.total_categories ?? 0,
        Icon:MdCategory 
      },
      { 
        heading:"Total Services",
        count:user?.dashboard?.total_service ?? 0,
        Icon:RxGear
      },
      { 
        heading:"Total Vendors",
        count:user?.dashboard?.total_vendors ?? 0,
        Icon:FaCircleUser
      },
      { 
        heading:"Total Enquries",
        count:user?.dashboard?.total_enquries ?? 0,
        Icon:CiSquareInfo 
      }
    ]
  }

  return (
      <>
      <div className="py-10">
      <h1 className='text-5xl  text-zinc-900 font-psmbold pb-4 px-4'>Dashboard</h1>
        <div className="grid  container mx-auto grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {
   user&&  user.role&&    data[user.role]&& data[user.role].map((cur,i)=>{
            return <DashboardCard key={i} data={cur} />
          })
        }
        </div>
      </div>
      
      </>
  )
}

export default Dashboard

const DashboardCard =({data})=>{
  return (
    <div className="p-4 bg-white border rounded-lg flex items-center justify-between">

            <div className="">
              <data.Icon className='text-5xl text-logo'/>
            </div>
            <div className="flex items-end flex-col justify-center gap-y-2">
              <h2 className='text-xl font-psmbold text-zinc-900'>{data.heading}</h2>
              <p className='text-2xl font-pregular text-zinc-500 text-end '>{data.count}</p>
            </div>

    </div>
  )
}