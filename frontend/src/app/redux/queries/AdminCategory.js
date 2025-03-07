import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const AdminCategoryQuery = createApi({
    reducerPath: 'AdminCategoryQuery',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/admin/category"  }),
    endpoints: (build) => ({
      createCategory: build.mutation({
        query: (data) => ({
            url: `create`,
        method: 'POST',
        body: data, 
        }),
      }),
    }),
  })
  export const { useCreateCategoryMutation } = AdminCategoryQuery  