import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import FavouritesAndWatchLaterPage from "./pages/FavouritesAndWatchLaterPage/FavouritesAndWatchLaterPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route
            path="/movies/search"
            element={<DiscoverPage isMovie={true} />}
          />
          <Route
            path="/tv-shows/search"
            element={<DiscoverPage isMovie={false} />}
          />
          <Route path="/movies" element={<DiscoverPage isMovie={true} />} />
          <Route path="/movies/:id" element={<ItemPage />} />
          <Route path="/tv-shows" element={<DiscoverPage isMovie={false} />} />
          <Route path="/tv-shows/:id" element={<ItemPage />} />
          <Route
            path="/favourites"
            element={<FavouritesAndWatchLaterPage isFavourite={true} />}
          />
          <Route
            path="/watch-later"
            element={<FavouritesAndWatchLaterPage isFavourite={false} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
