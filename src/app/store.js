import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalSlice";
import clickedItemReducer from "../features/clickedItemSlice";
import searchTextReducer from "../features/searchTextSlice";
import watchlistPaginationReducer from "../features/watchlistPaginationSlice";

export default configureStore({
    reducer: {
        modal: modalReducer,
        clickedItem: clickedItemReducer,
        searchText: searchTextReducer,
        watchlistPagination: watchlistPaginationReducer,
    }
})