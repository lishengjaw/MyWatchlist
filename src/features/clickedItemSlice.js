import { createSlice } from "@reduxjs/toolkit";

export const clickedItemSlice = createSlice({
    name: "clickedItem",
    initialState: {
        clickedItem: null,
    },
    reducers:{
        setClickedItem: (state, action) => {
            state.clickedItem = action.payload;
        },
        removeClickedItem: (state) => {
            state.clickedItem = null;
        }
    }
})

export const { setClickedItem, removeClickedItem } = clickedItemSlice.actions;

export const selectClickedItem = (state) => state.clickedItem.clickedItem;

export default clickedItemSlice.reducer;