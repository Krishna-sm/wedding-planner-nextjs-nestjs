"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserSlice } from "./slices/UserSlice";
export const store = configureStore({
    reducer:{
        [UserSlice.name]:UserSlice.reducer
    },
    middleware:f=>f().concat()
})

setupListeners(store.dispatch)