"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserSlice } from "./slices/UserSlice";
import { SidebarSlice } from "./slices/SidebarSlice";
import { AdminCategoryQuery } from "./queries/AdminCategory";
import { VendorServiceQuery } from "./queries/VendorService";
import { PublicServiceQuery } from "./queries/PublicQuery";
import { VendorQuery } from "./queries/VendorQUery";
export const store = configureStore({
    reducer:{
        [UserSlice.name]:UserSlice.reducer,
        [SidebarSlice.name]:SidebarSlice.reducer,
        [AdminCategoryQuery.reducerPath]:AdminCategoryQuery.reducer,
        [VendorServiceQuery.reducerPath]:VendorServiceQuery.reducer,
        [PublicServiceQuery.reducerPath]:PublicServiceQuery.reducer,
        [VendorQuery.reducerPath]:VendorQuery.reducer
    },
    middleware:f=>f().concat(AdminCategoryQuery.middleware,VendorServiceQuery.middleware,PublicServiceQuery.middleware,VendorQuery.middleware)
})

setupListeners(store.dispatch)