import "../styles/DisplayRows.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { Badge, Image } from "react-bootstrap";
import {
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";
import { useNavigate } from "react-router-dom";
import {
  selectColor,
  selectRatingColor,
} from "../controllers/UtilityController";
import { debounce } from "lodash";

const DisplayRows = (props) => {
  const { poster_path, title, vote_average, genre_list, name, isMovie, id } =
    props.data;
  const isFavourite = props.isFavourite;
  const toWatchLater = props.toWatchLater;
  const navigate = useNavigate();

  const removeItem = debounce(() => {
    if(isFavourite){
      removeFromFavourites(props.data);
    }
    else{
      removeFromWatchLater(props.data);
    }
  }, 500);

  return (
    <div className="display-row">
      <div
        className="display-row-left"
        onClick={() => {
          isMovie ? navigate(`/movies/${id}`) : navigate(`/tv-shows/${id}`);
        }}
      >
        <Image
          src={
            poster_path
              ? `${process.env.REACT_APP_POSTER_PATH}${poster_path}`
              : `/images/no-poster-placeholder.png`
          }
        />
      </div>

      <div
        className="display-row-center"
        onClick={() => {
          isMovie ? navigate(`/movies/${id}`) : navigate(`/tv-shows/${id}`);
        }}
      >
        <h4>{title || name}</h4>
        <div>
          {genre_list?.map((genre, index) => (
            <Badge pill key={index}>
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      <div className="display-row-right">
        <h6 style={{ backgroundColor: selectRatingColor(vote_average) }}>
          {parseFloat(vote_average).toFixed(1)}
        </h6>
        {isFavourite ? (
          <FaHeart
            style={{ color: selectColor(isFavourite, toWatchLater) }}
            onClick={removeItem}
          />
        ) : (
          <FaBookmark
            style={{ color: selectColor(isFavourite, toWatchLater) }}
            onClick={removeItem}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayRows;
