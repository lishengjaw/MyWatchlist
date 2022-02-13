import { Navbar, Container, Nav } from "react-bootstrap";
import "../styles/Header.css";
import { FaFilm } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/">
          <FaFilm />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/movies">Discover Movies</Nav.Link>
            <Nav.Link href="/tv-shows">Discover TV Shows</Nav.Link>
            <Nav.Link href="/favourites">Favourites</Nav.Link>
            <Nav.Link href="/watch-later">Watch Later</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
