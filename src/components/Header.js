import { Navbar, Container, Nav } from "react-bootstrap";
import "../styles/Header.css";
import { FaFilm } from "react-icons/fa";
import SearchBar from "./SearchBar";
import headerList from "../data/header-list";

const Header = () => {
  const pathname = `/${window.location.pathname.split("/")[1]}`;
  return (
    <Navbar expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand href="/" className="text-light">
          <FaFilm />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto flex-fill justify-content-evenly">
            {headerList.map(({ id, link, title }) => {
              return (
                <Nav.Link
                  key={id}
                  href={link}
                  className={`text-light ${pathname === link && "nav-active"}`}
                >
                  {title}
                </Nav.Link>
              );
            })}
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
