"use client";
import { removeUser, setUser } from "@/app/redux/slices/UserSlice";
import Loader from "@/components/Loader";
import { axiosClient } from "@/utils/AxiosClient";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const mainContext = createContext({
    fetchUserProfile(){},
    logoutHandler(){}
})

export const useMainContext = ()=> useContext(mainContext)

export const MainContextProvider = ({children})=>{
 
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
const router = useRouter()
    const fetchUserProfile = async()=>{
        const token = localStorage.getItem("token") ||''
        try {
            if(!token) return
            

            const response = await axiosClient.get("/auth/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await response.data;
            dispatch(setUser(data))
            

        } catch (error) {
            toast.error(error.response.data.message || error.message)
            dispatch(removeUser({}))
        }finally{
            setLoading(false)
        }
    }
    const logoutHandler = ()=>{
        try {
            dispatch(removeUser({}))
            localStorage.removeItem("token")
            toast.success("Logout Success")
            router.push("/login")
        } catch (error) {
                toast.error(error.message)
        }
    }


    useEffect(()=>{
        fetchUserProfile()
    },[])

    if(loading){
        return <div className=" min-h-screen flex items-center justify-center">
            <Loader/>
        </div>
    }

    return (
        <mainContext.Provider value={{fetchUserProfile,logoutHandler}}>
            {children}
        </mainContext.Provider>
    )
}