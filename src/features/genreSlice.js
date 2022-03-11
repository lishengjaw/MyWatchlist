import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
    name: "genre",
    initialState: {
        activeGenre: 0,
    },
    reducers:{
        setGenre: (state, action) => {
            state.activeGenre = action.payload;
        },
    }
})

export const { setGenre } = genreSlice.actions;

export const selectGenre = (state) => state.genre.activeGenre;

export default genreSlice.reducer;