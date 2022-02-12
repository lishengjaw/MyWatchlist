import DiscoverSearchBar from "./DiscoverSearchBar";
import DiscoverTVShowsList from "./DiscoverTVShowsList";
import WatchlistModal from "./WatchlistModal";
import { useSelector, useDispatch } from "react-redux";
import { selectClickedItem } from "../features/clickedItemSlice";
import { useEffect, useState } from "react";
import {
  getCastsAndDirectors,
  getDiscoverTVShows,
  getGenres,
  getOtherTVShowsDetails,
  getVideo,
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
  const clickedItem = useSelector(selectClickedItem);
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
        const new_data = await Promise.all(
          data.results.map(async (item) => {
            const {
              genre_ids,
              id,
              name,
              overview,
              poster_path,
              first_air_date,
              vote_average,
            } = item;

            const genre_names = await getGenres(genre_ids, false);
            const { casts } = await getCastsAndDirectors(id, false);
            const video_key = await getVideo(id, false);
            const {
              created_by,
              last_air_date,
              number_of_episodes,
              number_of_seasons,
              status,
            } = await getOtherTVShowsDetails(id);
            const directors = created_by.map((director) => {
              return director.name;
            });

            return {
              genre_names,
              id,
              title: name,
              overview,
              poster_path,
              start_date: first_air_date,
              end_date: last_air_date,
              vote_average,
              casts,
              directors,
              video_key,
              number_of_episodes,
              number_of_seasons,
              status,
            };
          })
        );
        setDiscoverTVShowsList(new_data);
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
    }, 5000);
  }, []);

  return (
    <div className="background">
      <DiscoverSearchBar />
      {discoverTVShowsList && discoverTVShowsList.length > 0 ? (
        <DiscoverTVShowsList temp={discoverTVShowsList} />
      ) : (
        <h1 className="discover-no-search-results">{errorMessage}</h1>
      )}
      {clickedItem && <WatchlistModal />}
    </div>
  );
};

export default DiscoverPage;
