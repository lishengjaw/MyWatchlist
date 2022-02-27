import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import DiscoverPage from "./components/DiscoverPage";
import ItemPage from "./components/ItemPage";
import FavouritesPage from "./components/FavouritesPage";
import WatchLaterPage from "./components/WatchLaterPage";
import ErrorPage from "./components/ErrorPage";
import GenreList from "./components/GenreList";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/movies" element={<DiscoverPage isMovie={true} />} />
          <Route path="/movies/:id" element={<ItemPage />} />
          <Route path="/tv-shows" element={<DiscoverPage isMovie={false} />} />
          <Route path="/tv-shows/:id" element={<ItemPage />} />
          <Route path="/movies/genres" element={<GenreList isMovie={true}/>} />
          <Route path="/tv-shows/genres" element={<GenreList isMovie={false}/>} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
