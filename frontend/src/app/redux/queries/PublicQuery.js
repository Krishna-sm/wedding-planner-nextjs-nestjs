import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const PublicServiceQuery = createApi({
    reducerPath: 'PublicServiceQuery',
    tagTypes:[],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URI+"/public"  }),
    endpoints: (build) => ({
        
        alllCateries:build.query({
            query: () => ({
                url: `/all-categories`,
                method: 'GET',
            }),
        }),
        // get popular categories
            popularCateries:build.query({
                query: () => ({
                    url: `/categories`,
                    method: 'GET',
                }),
            }),
            popularServices:build.query({
                query: () => ({
                    url: `/services`,
                    method: 'GET',
                }),
            }),
            allServices:build.query({
                query: () => ({
                    url: `/all-services`,
                    method: 'GET',
                }),
            }),
            
            allServicesBySlug:build.query({
                query: (slug) => ({
                    url: `/all-services/`+slug,
                    method: 'GET',
                }),
            }),
            
      
    }),
  })
  export const { 
        usePopularCateriesQuery,
        usePopularServicesQuery,
        useAlllCateriesQuery,
        useAllServicesQuery,
        useAllServicesBySlugQuery
  } = PublicServiceQuery  