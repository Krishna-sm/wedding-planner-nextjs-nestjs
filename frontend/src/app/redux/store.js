"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserSlice } from "./slices/UserSlice";
import { SidebarSlice } from "./slices/SidebarSlice";
import { AdminCategoryQuery } from "./queries/AdminCategory";
export const store = configureStore({
    reducer:{
        [UserSlice.name]:UserSlice.reducer,
        [SidebarSlice.name]:SidebarSlice.reducer,
        [AdminCategoryQuery.reducerPath]:AdminCategoryQuery.reducer
    },
    middleware:f=>f().concat(AdminCategoryQuery.middleware)
})

setupListeners(store.dispatch)