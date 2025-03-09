import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const VendorServiceQuery = createApi({
    reducerPath: 'VendorServiceQuery',
    tagTypes:[],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/vendor/service"  }),
    endpoints: (build) => ({
     
      
    }),
  })
  export const { } = VendorServiceQuery  