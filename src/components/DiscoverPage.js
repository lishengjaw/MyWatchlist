import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActivePage,
  setActivePage,
  setTotalPages,
} from "../features/watchlistPaginationSlice";
import SearchBar from "./SearchBar";
import DiscoverList from "./DiscoverList";
import { getDiscoverItems, searchDiscoverItems } from "../controllers/APIController";
import { selectSearchText } from "../features/searchTextSlice";

const DiscoverPage = ({ isMovie }) => {
  const [discoverList, setDiscoverList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    `Loading ${isMovie ? "movies" : "TV shows"}...`
  );
  const activePage = useSelector(selectActivePage);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
    const fetchMovies = async (isListEmpty) => {
      let data = null;
      if (isListEmpty) {
        data = await getDiscoverItems(isMovie, activePage);
      } else {
        data = await searchDiscoverItems(isMovie, searchText, activePage);
      }
      setDiscoverList(data.results);
      dispatch(setTotalPages(data.total_pages));
    };
    if (searchText.length === 0) {
      fetchMovies(true);
    } else {
      fetchMovies(false);
    }
  }, [searchText, activePage]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [searchText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setErrorMessage(`No ${isMovie ? "movies" : "TV shows"} found`);
    }, 10000);
  }, []);

  return (
    <div className="background">
      <SearchBar />
      {discoverList && discoverList.length > 0 ? (
        <DiscoverList temp={discoverList} isMovie />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default DiscoverPage;
