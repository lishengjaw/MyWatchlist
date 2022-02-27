import { useEffect, useState } from "react";
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
      setGenres(data.genres);
      setSelectedGenre(data.genres[0].id);
      applyActiveClass();
    };
    fetchGenresFilters(isMovie);
  }, [isMovie]);

  useEffect(() => {
    const fetchItemsByGenre = async (genre) => {
      const data = await getItemsByGenre(isMovie, genre, 1);
      setItemsByGenre(data.results);
      dispatch(setActivePage(1));
      dispatch(setTotalPages(data.total_pages));
    };
    fetchItemsByGenre(selectedGenre);
  }, [isMovie, selectedGenre]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchItemsByGenre = async (genre) => {
      const data = await getItemsByGenre(isMovie, genre, activePage);
      setItemsByGenre(data.results);
    };
    fetchItemsByGenre(selectedGenre);
  }, [isMovie, activePage]);

  document.querySelectorAll(".genre-filter").forEach((element) => {
    element.addEventListener("click", () => {
      const id = parseInt(element.getAttribute("data-id"));
      replaceActiveClass(id);
      setSelectedGenre(id);
    });
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(`No ${isMovie ? "movies" : "TV shows"} found`);
    }, 10000);
  }, []);

  const applyActiveClass = () => {
    const first_genre_filter =
      document.getElementsByClassName("genre-filter")[0];
    first_genre_filter.className += " genre-filter-active";
  };

  const replaceActiveClass = (genre) => {
    const genre_filter_active = document.getElementsByClassName(
      "genre-filter-active"
    );
    for (let i = 0; i < genre_filter_active.length; i++) {
      const element = genre_filter_active[i];
      element.className = element.className.replace("genre-filter-active", "");
    }
    const new_genre_filter_active = document.querySelector(
      `[data-id="${genre}"]`
    );
    new_genre_filter_active.className += " genre-filter-active";
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setErrorMessage(`No ${isMovie ? "movie" : "TV show"} found`);
    }, 10000);
  }, [isMovie]);

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
