import DiscoverSearchBar from "./DiscoverSearchBar";
import DiscoverMoviesList from "./DiscoverMoviesList";
import WatchlistModal from "./WatchlistModal";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedItem } from "../features/clickedItemSlice";
import { useEffect, useState } from "react";
import {
  getCastsAndDirectors,
  getDiscoverMovies,
  getGenres,
  getVideo,
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
  const [errorMessage, setErrorMessage] = useState("Trying to load movies...");
  const clickedItem = useSelector(selectClickedItem);
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
        const new_data = await Promise.all(
          data.results.map(async (item) => {
            const {
              genre_ids,
              id,
              title,
              overview,
              poster_path,
              release_date,
              vote_average,
            } = item;
            const genre_names = await getGenres(genre_ids, true);
            const { casts, directors } = await getCastsAndDirectors(id, true);
            const video_key = await getVideo(id, true);
            return {
              genre_names,
              id,
              title,
              overview,
              poster_path,
              date: release_date,
              vote_average,
              casts,
              directors,
              video_key,
            };
          })
        );
        setDiscoverMoviesList(new_data);
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
      setErrorMessage("No movies found")
    }, 5000)
  }, [])

  return (
    <div className="background">
      <DiscoverSearchBar />
      {discoverMoviesList && discoverMoviesList.length > 0 ? (
        <DiscoverMoviesList temp={discoverMoviesList} />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
      {clickedItem && <WatchlistModal />}
    </div>
  );
};

export default DiscoverPage;
