import { configureStore } from "@reduxjs/toolkit";
import searchTextReducer from "../features/searchTextSlice";
import watchlistPaginationReducer from "../features/watchlistPaginationSlice";

export default configureStore({
    reducer: {
        searchText: searchTextReducer,
        watchlistPagination: watchlistPaginationReducer,
    }
})