import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "../features/searchTextSlice";
import paginationReducer from "../features/paginationSlice";
import genreReducer from "../features/genreSlice";

export default configureStore({
    reducer: {
        searchText: searchTextReducer,
        watchlistPagination: paginationReducer,
        genre: genreReducer,
    }
})