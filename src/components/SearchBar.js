import { FaSearch } from "react-icons/fa";
import "../styles/SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchText,
  setSearchText,
  clearSearchText,
} from "../features/searchTextSlice";

const SearchBar = () => {
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();

  return (
    <div className="searchbar">
      <FaSearch />
      <input
        type="search"
        value={searchText}
        placeholder="Search movies and TV shows"
        onChange={(e) => {
          if (e.target.value.length === 0) {
            dispatch(clearSearchText());
          } else {
            dispatch(setSearchText(e.target.value));
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
