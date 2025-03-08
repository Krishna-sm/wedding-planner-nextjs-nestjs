import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const AdminCategoryQuery = createApi({
    reducerPath: 'AdminCategoryQuery',
    tagTypes:['getAllCategories','singleCategory'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/admin/category"  }),
    endpoints: (build) => ({
      createCategory: build.mutation({
        query: (data) => ({
            url: `/create`,
        method: 'POST',
        body: data, 
      headers:{ 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
        }),
        invalidatesTags:['getAllCategories']
      }),

      getAllCategories: build.query({
        query: (data) => ({
            url: `/get-all`,
        method: 'GET', 
      headers:{ 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
        }),
        providesTags:['getAllCategories']
      }),
      deleteCategory: build.mutation({
        query: (id) => ({
            url: `/delete/${id}`,
        method: 'DELETE',
      headers:{ 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
        }),
        invalidatesTags:['getAllCategories']
      }),


      getCategory: build.query({
        query: (id) => ({
            url: `/get/${id}`,
        method: 'GET', 
      headers:{ 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
        }),
        providesTags:['singleCategory']
      }),

      editCategory: build.mutation({
        query: ({id,data}) => ({
            url: `/edit/${id}`,
        method: 'PUT',
        body: data, 
      headers:{ 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
        }),
        invalidatesTags:['getAllCategories','singleCategory']
      }),

      
    }),
  })
  export const { useCreateCategoryMutation,useGetAllCategoriesQuery,useDeleteCategoryMutation ,useGetCategoryQuery,useEditCategoryMutation} = AdminCategoryQuery  