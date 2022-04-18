const getDiscoverItems = async (isMovie, activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/discover/${
        isMovie ? "movie" : "tv"
      }/?api_key=${
        process.env.REACT_APP_API_KEY
      }&sort_by=popularity.desc&page=${activePage}`
    );
    const data = res.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

const searchDiscoverItems = async (isMovie, searchText, activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/search/${
        isMovie ? "movie" : "tv"
      }/?api_key=${
        process.env.REACT_APP_API_KEY
      }&query=${searchText}&page=${activePage}`
    );
    const data = res.json();
    return data;
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

const getGenres = async (isMovie) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/genre/${
        isMovie ? "movie" : "tv"
      }/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

const getItemsByGenre = async (isMovie, genre, activePage) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/discover/${
        isMovie ? "movie" : "tv"
      }?with_genres=${genre}&api_key=${
        process.env.REACT_APP_API_KEY
      }&sort_by=popularity.desc&page=${activePage}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

export {
  getDiscoverItems,
  searchDiscoverItems,
  getCastsAndDirectors,
  getVideo,
  getRecommendedMoviesAndTVShows,
  getItemById,
  getGenres,
  getItemsByGenre,
};
