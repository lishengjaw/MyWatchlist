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

const getItemById = async (id, isMovie) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        isMovie ? "movie" : "tv"
      }/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    alert(err);
  }
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
        const { id, name } = data.cast[i];
        casts.push({ id, name });
      }
    }
    for (let i = 0; i < data.crew.length; i++) {
      const { id, name, job } = data.crew[i];
      if (isMovie && job === "Director" && !set.has(id)) {
        directors.push({ id, name });
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

const getRecommendedMoviesAndTVShows = async (id, isMovie) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/${
        isMovie ? "movie" : "tv"
      }/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    alert(err);
  }
};

export {
  getDiscoverMovies,
  searchDiscoverMovies,
  getDiscoverTVShows,
  searchDiscoverTVShows,
  getCastsAndDirectors,
  getVideo,
  getRecommendedMoviesAndTVShows,
  getItemById,
};
