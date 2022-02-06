import { FaFilm } from "react-icons/fa";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="background home-page">
      <div className="logo">
        <a href="/discover-movies">
          <FaFilm />
        </a>
      </div>
      <h1>MyWatchlist</h1>
      <h5>Click on the logo to discover movies and TV shows</h5>
    </div>
  );
};

export default HomePage;
