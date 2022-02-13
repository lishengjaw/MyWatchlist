import DiscoverSearchBar from "./DiscoverSearchBar";
import DiscoverTVShowsList from "./DiscoverTVShowsList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDiscoverTVShows,
  searchDiscoverTVShows,
} from "../controllers/APIController";
import { selectSearchText } from "../features/searchTextSlice";
import {
  selectActivePage,
  setActivePage,
  setTotalPages,
} from "../features/watchlistPaginationSlice";

const DiscoverPage = () => {
  const [discoverTVShowsList, setDiscoverTVShowsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("Loading TV shows...");
  const searchText = useSelector(selectSearchText);
  const activePage = useSelector(selectActivePage);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchTVShows = async (isListEmpty) => {
      try {
        let res = null;
        if (isListEmpty) {
          res = await getDiscoverTVShows(activePage);
        } else {
          res = await searchDiscoverTVShows(searchText, activePage);
        }
        const data = await res.json();
        setDiscoverTVShowsList(data.results);
        dispatch(setTotalPages(data.total_pages));
      } catch (err) {
        alert(err);
      }
    };

    if (searchText.length === 0) {
      fetchTVShows(true);
    } else {
      fetchTVShows(false);
    }
  }, [searchText, activePage]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [searchText]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("No TV shows found");
    }, 10000);
  }, []);

  return (
    <div className="background">
      <DiscoverSearchBar />
      {discoverTVShowsList && discoverTVShowsList.length > 0 ? (
        <DiscoverTVShowsList temp={discoverTVShowsList} />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default DiscoverPage;
