import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActivePage,
  setActivePage,
  setTotalPages,
} from "../features/watchlistPaginationSlice";
import SearchBar from "./SearchBar";
import DiscoverList from "./DiscoverList";
import {
  getDiscoverItems,
  searchDiscoverItems,
} from "../controllers/APIController";
import { selectSearchText } from "../features/searchTextSlice";
import { setErrorTimeout } from "../controllers/UtilityController";
import { debounce } from "lodash";

const DiscoverPage = ({ isMovie }) => {
  const [discoverList, setDiscoverList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    `Loading ${isMovie ? "movies" : "TV shows"}...`
  );
  const activePage = useSelector(selectActivePage);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [dispatch, searchText]);

  const fetchItems = useMemo(
    () =>
      debounce(async (isListEmpty) => {
        setErrorMessage(`Loading ${isMovie ? "movies" : "TV shows"}...`);
        let data = null;
        if (isListEmpty) {
          data = await getDiscoverItems(isMovie, activePage);
        } else {
          data = await searchDiscoverItems(isMovie, searchText, activePage);
        }
        if (data.results.length > 0) {
          setDiscoverList(data.results);
          dispatch(setTotalPages(data.total_pages));
          window.scrollTo({ top: 0, behaviour: "smooth" });
        } else {
          setDiscoverList([]);
          setErrorTimeout(
            setErrorMessage,
            `No ${isMovie ? "movies" : "TV shows"} found`
          );
        }
      }, 1000),
    [dispatch, isMovie, searchText, activePage]
  );

  useEffect(() => {
    if (searchText.length === 0) {
      fetchItems(true);
    } else {
      fetchItems(false);
    }
    return () => fetchItems.cancel();
  }, [fetchItems, searchText.length]);

  return (
    <div className="background">
      <SearchBar
        setDiscoverList={setDiscoverList}
        setErrorMessage={setErrorMessage}
        isMovie
      />
      {discoverList && discoverList.length > 0 ? (
        <DiscoverList temp={discoverList} isMovie={isMovie} />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default DiscoverPage;
