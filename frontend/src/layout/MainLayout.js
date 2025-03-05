"use client";
import { store } from '@/app/redux/store';
import Header from '@/components/Header';
import { MainContextProvider } from '@/context/MainContext'
import React from 'react'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const MainLayout = ({children}) => {
  return (
   <>
   <Provider store={store}>
     <MainContextProvider>
      <Header/>
      <ToastContainer/>
      {children}
      </MainContextProvider>
     </Provider>
   </>
  )
}

export default MainLayout