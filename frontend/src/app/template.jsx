
import React from 'react'
import MainLayout from "@/layout/MainLayout";

export const metadata = {
    title: "Subh Vivah",
    description: "Shubh Vivah is a wedding planning service that aims to transform the wedding planning experience for Indian couples, offering a range of services including vendor management, event flow management, decor planning, guest management, and more, with a focus on creating memorable and personalized celebrations. ",
  };
const MainRootTemplate = ({children}) => {
  return (
    <MainLayout>
    {children}
    
            </MainLayout>
  )
}

export default MainRootTemplate