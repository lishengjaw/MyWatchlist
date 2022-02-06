import { createSlice } from "@reduxjs/toolkit";

export const searchTextSlice = createSlice({
    name: "searchText",
    initialState: {
        searchText: "",
    },
    reducers:{
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        clearSearchText: (state) => {
            state.searchText = "";
        }
    }
})

export const { setSearchText, clearSearchText } = searchTextSlice.actions;

export const selectSearchText = (state) => state.searchText.searchText;

export default searchTextSlice.reducer;