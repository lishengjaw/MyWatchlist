import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { setActivePage, setTotalPages } from "../../features/paginationSlice";
import DiscoverList from "../../components/DiscoverList";
import GenreList from "../../components/GenreList";
import Pagination from "../../components/Pagination";
import {
  getDiscoverItems,
  getItemsByGenre,
  searchDiscoverItems,
} from "../../controllers/APIController";
import { setSearchText } from "../../features/searchTextSlice";

const DiscoverPage = ({ isMovie }) => {
  const [discoverList, setDiscoverList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const pathname = window.location.pathname;
  const hidden = pathname === "/movies" || pathname === "/tv-shows";

  useEffect(() => {
    const fetchItems = async () => {
      const page = searchParams.get("page");
      const query = searchParams.get("query");
      const genre = searchParams.get("genre");

      let pageInt = parseInt(page);
      let genreInt = parseInt(genre);

      if (isNaN(pageInt)) {
        pageInt = 1;
      }
      dispatch(setActivePage(pageInt));
      if (isNaN(genreInt) || genreInt === 0) {
        genreInt = null;
      }

      let data = null;
      if (query) {
        dispatch(setSearchText(query));
        data = await searchDiscoverItems(isMovie, query, pageInt);
      } else if (genreInt) {
        data = await getItemsByGenre(isMovie, genre, pageInt);
      } else {
        data = await getDiscoverItems(isMovie, pageInt);
      }
      if (data.results?.length > 0) {
        setDiscoverList(data.results);
        dispatch(setTotalPages(data.total_pages));
        window.scrollTo({ top: 0, behaviour: "smooth" });
      } else {
        setDiscoverList([]);
      }
      setLoading(false);
    };
    fetchItems();
  }, [dispatch, isMovie, searchParams, loading]);

  return (
    <div className="discover-page background">
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <>
          {discoverList?.length > 0 ? (
            <>
              <h1 className="page-header">{`${
                isMovie ? "Movies" : "TV Shows"
              }`}</h1>
              {hidden && <GenreList isMovie={isMovie} />}
              <DiscoverList temp={discoverList} isMovie={isMovie} />
              <Pagination />
            </>
          ) : (
            <h1 className="error">No results</h1>
          )}
        </>
      )}
    </div>
  );
};

export default DiscoverPage;
