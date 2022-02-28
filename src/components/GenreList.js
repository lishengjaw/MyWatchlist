import { useEffect, useMemo, useState } from "react";
import { getGenres, getItemsByGenre } from "../controllers/APIController";
import { Badge } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../styles/GenreList.css";
import {
  selectActivePage,
  setActivePage,
  setTotalPages,
} from "../features/watchlistPaginationSlice";
import { useDispatch, useSelector } from "react-redux";
import DiscoverList from "./DiscoverList";
import {
  applyActiveClass,
  replaceActiveClass,
  setErrorTimeout,
} from "../controllers/UtilityController";
import { debounce } from "lodash";

const GenreFilters = ({ isMovie }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [itemsByGenre, setItemsByGenre] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    `Loading ${isMovie ? "movie..." : "TV show..."}`
  );
  const dispatch = useDispatch();
  const activePage = useSelector(selectActivePage);

  useEffect(() => {
    const fetchGenresFilters = async (isMovie) => {
      const data = await getGenres(isMovie);
      if (data.genres.length > 0) {
        setGenres(data.genres);
        setSelectedGenre(data.genres[0].id);
        applyActiveClass();
      }
    };
    fetchGenresFilters(isMovie);
  }, [isMovie]);

  useEffect(() => {
    dispatch(setActivePage(1));
  }, [dispatch, selectedGenre]);

  const fetchItemsByGenre = useMemo(
    () =>
      debounce(async (genre) => {
        setErrorMessage(`Loading ${isMovie ? "movie..." : "TV show..."}`);
        const data = await getItemsByGenre(isMovie, genre, activePage);
        if (data.results.length > 0) {
          setItemsByGenre(data.results);
          dispatch(setTotalPages(data.total_pages));
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setErrorTimeout(
            setErrorMessage(`No ${isMovie ? "movies" : "TV shows"} found`)
          );
        }
      }, 1000),
    [dispatch, isMovie, activePage]
  );

  useEffect(() => {
    fetchItemsByGenre(selectedGenre);
    return () => fetchItemsByGenre.cancel();
  }, [fetchItemsByGenre, activePage, selectedGenre]);

  document.querySelectorAll(".genre-filter").forEach((element) => {
    element.addEventListener("click", () => {
      const id = parseInt(element.getAttribute("data-id"));
      replaceActiveClass(id);
      setSelectedGenre(id);
    });
  });

  return (
    <div className="genres-page background">
      <h1>{isMovie ? "Movie Genres" : "TV Show Genres"}</h1>
      <div className="genre-filters-row">
        <Badge
          onClick={() => {
            const element = document.getElementsByClassName("genre-filters")[0];
            element.scrollLeft -= 0.5 * element.clientWidth;
          }}
        >
          <FaAngleLeft />
        </Badge>
        <div className="genre-filters">
          {genres &&
            genres.length > 0 &&
            genres.map((genre) => {
              const { id, name } = genre;
              return (
                <Badge pill className="genre-filter" key={id} data-id={id}>
                  {name}
                </Badge>
              );
            })}
        </div>
        <Badge
          onClick={() => {
            const element = document.getElementsByClassName("genre-filters")[0];
            element.scrollLeft += 0.5 * element.clientWidth;
          }}
        >
          <FaAngleRight />
        </Badge>
      </div>
      {itemsByGenre && itemsByGenre.length > 0 ? (
        <DiscoverList temp={itemsByGenre} isHidden={true} />
      ) : (
        <h1 className="genre-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default GenreFilters;
