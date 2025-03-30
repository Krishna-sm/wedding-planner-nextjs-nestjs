import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const VendorQuery = createApi({
    reducerPath: 'VendorQuery',
    tagTypes:['fetchAll','fetchById'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/vendor"  }),
    endpoints: (build) => ({
       
        fetchAllEnquries:build.query({
               query: ({status,search,from,to}) => ({
                   url: `/enqueries?status=${status}&search=${search}&from=${from}&to=${to}`,
               method: 'GET', 
               
               headers:{ 
                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
               }
               }),
               providesTags:['fetchAll']

             
             }),
             fetchEnquryById:build.query({
                query: (id) => ({
                    url: `/enquery/${id}`,
                method: 'GET', 
                
                headers:{ 
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
                }),
               providesTags:['fetchById']

              
              }),

              updateEnqueryById:build.mutation({
                query: ({id,data}) => ({
                    url: `/enquery/status/${id}`,
                method: 'PUT', 
                body:data,
                
                headers:{ 
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
                }),
        invalidatesTags:['fetchById']

              
              }),

             
            
    }),
  })
  export const { 
    
    useFetchAllEnquriesQuery,
    useFetchEnquryByIdQuery,
    useUpdateEnqueryByIdMutation

  } = VendorQuery  