import { useEffect, useState } from "react";
import { getGenres } from "../../apis/APIController";
import { Badge } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../styles/GenreList.css";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../../features/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGenre, setGenre } from "../../features/genreSlice";

const GenreFilters = ({ isMovie }) => {
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeGenre = useSelector(selectGenre);

  useEffect(() => {
    const fetchGenresFilters = async (isMovie) => {
      const data = await getGenres(isMovie);
      if (data.genres.length > 0) {
        data.genres.unshift({ id: 0, name: "No filter" });
        setGenres(data.genres);
      }
    };
    fetchGenresFilters(isMovie);
  }, [isMovie]);

  return (
    <div className="genre-filters-row d-flex mb-3">
      <Badge
        onClick={() => {
          const element = document.getElementsByClassName("genre-filters")[0];
          element.scrollLeft -= 0.5 * element.clientWidth;
        }}
      >
        <FaAngleLeft />
      </Badge>
      <div className="genre-filters d-flex">
        {genres?.map(({ id, name }) => {
          return (
            <Badge
              pill
              className={`genre-filter ${
                id === activeGenre && "genre-filter-active"
              }`}
              key={id}
              data-id={id}
              onClick={() => {
                dispatch(setGenre(id));
                dispatch(setActivePage(1));
                navigate(
                  `/${isMovie ? "movies" : "tv-shows"}?genre=${id}&page=1`
                );
              }}
            >
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
  );
};

export default GenreFilters;
