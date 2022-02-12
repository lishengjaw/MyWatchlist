const getDiscoverMovies = async (activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${activePage}`
    );
    return res;
  } catch (err) {
    alert(err);
  }
};

const searchDiscoverMovies = async (searchText, activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/search/movie/?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${activePage}`
    );
    return res;
  } catch (err) {
    alert(err);
  }
};

const getDiscoverTVShows = async (activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/discover/tv/?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${activePage}`
    );
    return res;
  } catch (err) {
    alert(err);
  }
};

const searchDiscoverTVShows = async (searchText, activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${activePage}`
    );
    return res;
  } catch (err) {
    alert(err);
  }
};

const getGenres = async (genre_ids, isMovie) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/genre/${
        isMovie ? "movie" : "tv"
      }/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const genres_list = await res.json();
    return matchGenreIDWithName(genres_list, genre_ids);
  } catch (err) {
    alert(err);
  }
};

const matchGenreIDWithName = (genres, genre_ids) => {
  for (let i = 0; i < genre_ids.length; i++) {
    for (let j = 0; j < genres.genres.length; j++) {
      if (genre_ids[i] === genres.genres[j].id) {
        genre_ids[i] = genres.genres[j].name;
      }
    }
  }
  return genre_ids;
};

const getCastsAndDirectors = async (id, isMovie) => {
  const casts = [];
  const directors = [];
  const set = new Set();
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        isMovie ? "movie" : "tv"
      }/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    for (let i = 0; i < data.cast.length; i++) {
      if (data.cast[i] && data.cast[i].name) {
        const { name } = data.cast[i];
        casts.push(name);
      }
    }
    for (let i = 0; i < data.crew.length; i++) {
      const { id, name, job } = data.crew[i];
      if (isMovie && job === "Director" && !set.has(id)) {
        directors.push(name);
        set.add(id);
      }
    }
    return { casts, directors };
  } catch (err) {
    alert(err);
  }
};

const getVideo = async (id, isMovie) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        isMovie ? "movie" : "tv"
      }/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    for (let i = 0; i < data.results.length; i++) {
      const { key, type } = data.results[i];
      if (type === "Trailer") {
        return key;
      }
    }
    return null;
  } catch (err) {
    alert(err);
  }
};

const getOtherTVShowsDetails = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const otherTVShowsDetails = await res.json();
    return otherTVShowsDetails;
  } catch (err) {
    alert(err);
  }
};

export {
  getDiscoverMovies,
  searchDiscoverMovies,
  getDiscoverTVShows,
  searchDiscoverTVShows,
  getGenres,
  getCastsAndDirectors,
  getVideo,
  getOtherTVShowsDetails,
};
