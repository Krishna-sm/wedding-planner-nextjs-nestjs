import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const VendorServiceQuery = createApi({
    reducerPath: 'VendorServiceQuery',
    tagTypes:['get-all','get-by-id'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/vendor/service"  }),
    endpoints: (build) => ({
     
      createVendorService:build.mutation({
        query:(data)=>({
      
        url: `/create`,
        method: 'POST',
        body: data,
      headers:{ 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }),
        invalidatesTags:['get-all']

      })
      ,
      fetchAllCategoriesService:build.query({
        query: () => ({
            url: `/category`,
        method: 'GET', 
        
        headers:{ 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        }),
      
      }),

      fetchAllServices:build.query({
        query: ({page=1,Category=''}) => {
          let url = ''
          if(!Category){
            url = `/get-all?page=${page}`
          }else{

            url = `/get-all?page=${page}&category=${Category}`
          }
          return ({
            url,
        method: 'GET', 
        
        headers:{ 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
        })
        },
        providesTags:['get-all']
      }),
      deleteServiceById:build.mutation({
        query:(id)=>({
          url: `/delete/${id}`,
          method: 'DELETE',
          headers:{ 
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        invalidatesTags:['get-all']
      }),
      getServiceById:build.query({
        query:(id)=>({
          url: `/get/${id}`,
          method: 'GET', 
          headers:{ 
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        providesTags:['get-by-id']
      }),
      updateServiceById:build.mutation({
        query:({id,data})=>({
          url: `/update/${id}`,
          method: 'PUT', 
          body: data,
          headers:{ 
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }),
        invalidatesTags:['get-by-id','get-all']
      }),
     
      
    }),
  })
  export const { 
    useCreateVendorServiceMutation,
    useFetchAllCategoriesServiceQuery,
     useFetchAllServicesQuery ,
      useDeleteServiceByIdMutation ,
      useGetServiceByIdQuery,
      useUpdateServiceByIdMutation
    } = VendorServiceQuery  