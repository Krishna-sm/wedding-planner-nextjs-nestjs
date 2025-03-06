import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice = createSlice({
    name:'SidebarSlice',
    initialState:{
        isToggle:false,
        isCollapsed:false
    },
    reducers:{
        toggleSidebar:(state)=>{

            if(state.isCollapsed){
                state.isCollapsed = false; 
            }

            state.isToggle =!state.isToggle
        },
        toggleCollapse:(state)=>{
            state.isCollapsed =!state.isCollapsed
        }
    }
})

export const { toggleSidebar, toggleCollapse } = SidebarSlice.actions

export const SidebarSlicePath = (state)=>state.SidebarSlice