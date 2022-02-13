import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import DiscoverMoviesPage from "./components/DiscoverMoviesPage";
import DiscoverTVShowsPage from "./components/DiscoverTVShowsPage";
import FavouritesPage from "./components/FavouritesPage";
import WatchLaterPage from "./components/WatchLaterPage";
import ErrorPage from "./components/ErrorPage";
import WatchlistPage from "./components/WatchlistPage";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/movies" element={<DiscoverMoviesPage />} />
          <Route path="/movies/:id" element={<WatchlistPage />} />
          <Route path="/tv-shows" element={<DiscoverTVShowsPage />} />
          <Route path="/tv-shows/:id" element={<WatchlistPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
