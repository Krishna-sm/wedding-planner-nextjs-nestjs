import React from 'react'
import { IoCallOutline } from 'react-icons/io5'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CiMail, CiMobile2 } from 'react-icons/ci'
import { LuSend } from "react-icons/lu";

const ContactInfomation = ({
  name='John Doe',
  phone='+91 1234567890',
  email='johndoe@example.com',
  address='123 Main St, Anytown, USA',
}) => {

     
  return (
    <>
         
         <Dialog>
  <DialogTrigger className="text-xl p-2 rounded-full bg-whitesmoke shadow">
  <IoCallOutline/>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Contact Details</DialogTitle>
      <DialogDescription>
      only for enquiery 
      </DialogDescription>

      <div className="mb-3 flex items-center justify-between">

                <p className='flex items-center justify-center gap-x-2'>
                    <CiMobile2 className='text-2xl'/> <span>{phone}</span> 
                </p>
                <a href={`tel:${phone}`} className='text-xl p-2 rounded-full bg-whitesmoke shadow'>
                <IoCallOutline />
                </a>
        
      </div>

      
      <div className="mb-3 flex items-center justify-between">

                <p className='flex items-center justify-center gap-x-2'>
                    <CiMail  className='text-2xl'/> <span>{email}</span> 
                </p>
                <a href={`mailto:${email}`} className='text-xl p-2 rounded-full bg-whitesmoke shadow'>
                <LuSend  />
                </a>
        
      </div>
      
      
    </DialogHeader>
  </DialogContent>
</Dialog>
    </>
  )
}

export default ContactInfomation