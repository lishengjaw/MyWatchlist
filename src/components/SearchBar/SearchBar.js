import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchText,
  setSearchText,
  clearSearchText,
} from "../../features/searchTextSlice";
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../../features/paginationSlice";

const SearchBar = () => {
  const [searchType, setSearchType] = useState("Movies");
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultURL = `/movies?page=1&genre=0`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setActivePage(1));
    if (searchText.length === 0) {
      return navigate(defaultURL);
    }
    switch (searchType) {
      case "Movies":
        navigate(`/movies/search?query=${searchText}&page=1`);
        break;
      case "TV Shows":
        navigate(`/tv-shows/search?query=${searchText}&page=1`);
        break;
      default:
        navigate(defaultURL);
    }
  };

  return (
    <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
      <FormControl
        type="search"
        placeholder="Search movies and TV shows"
        aria-label="Search"
        className="shadow-none"
        value={searchText}
        onChange={(e) => {
          if (e.target.value.length === 0) {
            dispatch(clearSearchText());
          } else {
            dispatch(setSearchText(e.target.value));
          }
        }}
      />
      <InputGroup className="w-25">
        <DropdownButton title={searchType}>
          <Dropdown.Item onClick={() => setSearchType("Movies")}>
            Movies
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setSearchType("TV Shows")}>
            TV Shows
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <Button className="shadow-none" onClick={handleSubmit}>
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBar;
