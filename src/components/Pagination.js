import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActivePage,
  previousPage,
  nextPage,
  setActivePage,
  selectTotalPages,
} from "../features/paginationSlice";
import { useNavigate } from "react-router-dom";
import { selectGenre } from "../features/genreSlice";

const PageNumbers = () => {
  const activePage = useSelector(selectActivePage);
  let totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeGenre = useSelector(selectGenre);

  totalPages = totalPages > 500 ? 500 : totalPages;

  // Number of pages in total
  const MIN_PAGE = 1;
  const MAX_PAGE = totalPages;

  const pages = [];

  // Pagination range
  let lower_limit = 1;
  let upper_limit = totalPages;
  const small_interval = 2;
  const big_interval = 4;
  if (totalPages <= 5) {
    upper_limit = totalPages;
  } else if (
    activePage >= MIN_PAGE + small_interval &&
    activePage <= MAX_PAGE - small_interval
  ) {
    lower_limit =
      activePage - small_interval < MIN_PAGE
        ? MIN_PAGE
        : activePage - small_interval;
    upper_limit =
      activePage + small_interval > MAX_PAGE
        ? MAX_PAGE
        : activePage + small_interval;
  } else if (activePage < MIN_PAGE + small_interval) {
    upper_limit = MIN_PAGE + big_interval;
  } else if (activePage > MIN_PAGE + small_interval) {
    lower_limit = MAX_PAGE - big_interval;
  }

  for (let pageNumber = lower_limit; pageNumber <= upper_limit; pageNumber++) {
    pages.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === activePage}
        onClick={() => dispatch(setActivePage(pageNumber))}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;
    if (pathname === "/movies" || pathname === "/tv-shows") {
      params.set("genre", activeGenre);
    }
    params.set("page", activePage);
    navigate(`${window.location.pathname}?${params.toString()}`);
  }, [activePage, navigate, activeGenre]);

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.Prev
        className={activePage === MIN_PAGE && `disabled`}
        onClick={() => {
          dispatch(previousPage());
        }}
      />
      {pages}
      <Pagination.Next
        className={activePage === MAX_PAGE && `disabled`}
        onClick={() => dispatch(nextPage())}
      />
    </Pagination>
  );
};

export default PageNumbers;
