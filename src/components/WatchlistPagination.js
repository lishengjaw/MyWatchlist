import { Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActivePage,
  previousPage,
  nextPage,
  setActivePage,
  selectTotalPages
} from "../features/watchlistPaginationSlice";
import "../styles/WatchlistPagination.css";

const PageNumbers = () => {
  const activePage = useSelector(selectActivePage);
  let totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  
  totalPages = totalPages > 500 ? 500 : totalPages;

  // Number of pages in total
  const MIN_PAGE = 1;
  const MAX_PAGE = totalPages;
  
  const pages = [];

  // Pagination range
  let lower_limit = 1;
  let upper_limit = totalPages;
  if(totalPages <= 5){
    upper_limit = totalPages;
  }
  else if(activePage >= MIN_PAGE + 2 && activePage <= MAX_PAGE - 2){
    lower_limit = activePage - 2 < MIN_PAGE ? MIN_PAGE : activePage - 2;
    upper_limit = activePage + 2 > MAX_PAGE ? MAX_PAGE : activePage + 2;
  }
  else if(activePage < MIN_PAGE + 2){
    upper_limit = MIN_PAGE + 4;
  }
  else if(activePage > MIN_PAGE + 2){
    lower_limit = MAX_PAGE - 4;
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
  return (
    <Pagination>
      <Pagination.Prev className={activePage === MIN_PAGE && `disabled`} onClick={() => dispatch(previousPage())} />
      {pages}
      <Pagination.Next className={activePage === MAX_PAGE && `disabled`} onClick={() => dispatch(nextPage())} />
    </Pagination>
  );
};

export default PageNumbers;
