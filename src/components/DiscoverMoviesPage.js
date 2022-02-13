import DiscoverSearchBar from "./DiscoverSearchBar";
import DiscoverMoviesList from "./DiscoverMoviesList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDiscoverMovies,
  searchDiscoverMovies,
} from "../controllers/APIController";
import {
  selectActivePage,
  setActivePage,
  setTotalPages,
} from "../features/watchlistPaginationSlice";
import { selectSearchText } from "../features/searchTextSlice";

const DiscoverPage = () => {
  const [discoverMoviesList, setDiscoverMoviesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("Loading movies...");
  const activePage = useSelector(selectActivePage);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchMovies = async (isListEmpty) => {
      try {
        let res = null;
        if (isListEmpty) {
          res = await getDiscoverMovies(activePage);
        } else {
          res = await searchDiscoverMovies(searchText, activePage);
        }
        const data = await res.json();
        setDiscoverMoviesList(data.results);
        dispatch(setTotalPages(data.total_pages));
      } catch (err) {
        alert(err);
      }
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
    setTimeout(() => {
      setErrorMessage("No movies found");
    }, 10000);
  }, []);

  return (
    <div className="background">
      <DiscoverSearchBar />
      {discoverMoviesList && discoverMoviesList.length > 0 ? (
        <DiscoverMoviesList temp={discoverMoviesList} />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default DiscoverPage;
