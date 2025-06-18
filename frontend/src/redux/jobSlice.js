

import { createSlice } from "@reduxjs/toolkit";








const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        SingleJob: null,
        allAdminJobs: [],
        searchJobByText:"",
        allApliedJobs:[],
        searchedQuery:"",
        filterjobQuery:""
    },
    reducers: {
        setAlljobs: (state, action) => {
            state.alljobs = (action.payload);
        },
        setSingleJob: (state, action) => {
            state.SingleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        }, 
        setAllApliedJobs:( state, action)=>{
            state.allApliedJobs = action.payload;
        },
        setFilterjobQuery:( state, action)=>{
            state.filterjobQuery = action.payload;
        },
        setsearchedQuery:( state, action)=>{
            state.searchedQuery = action.payload ;
        },

    }
})

export const { setAlljobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllApliedJobs, setFilterjobQuery,setsearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;