import { FaFilm } from "react-icons/fa";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="background home-page d-flex flex-column justify-content-center align-items-center">
      <div className="home-page-logo p-4 mb-3">
        <a
          href="/movies?genre=0&page=1"
          className="text-light d-flex justify-content-center align-items-center"
        >
          <FaFilm />
        </a>
      </div>
      <h1>MyWatchlist</h1>
    </div>
  );
};

export default HomePage;
