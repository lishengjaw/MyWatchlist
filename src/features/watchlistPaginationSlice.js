import { createSlice } from "@reduxjs/toolkit";

export const watchlistPaginationSlice = createSlice({
  name: "pagination",
  initialState: {
    activePage: 1,
    totalPages: 500,
  },
  reducers: {
    previousPage: (state) => {
      state.activePage -= 1;
    },
    nextPage: (state) => {
      state.activePage += 1;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  previousPage,
  nextPage,
  setActivePage,
  setTotalPages,
} = watchlistPaginationSlice.actions;

export const selectActivePage = (state) => state.watchlistPagination.activePage;

export const selectTotalPages = (state) => state.watchlistPagination.totalPages;

export default watchlistPaginationSlice.reducer;
