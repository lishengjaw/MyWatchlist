import { useEffect, useState } from "react";
import "../styles/GenreCounter.css";

const GenreCounter = (props) => {
  const { temp } = props;
  const [genreList, setGenreList] = useState(null);
  useEffect(() => {
    const getGenreCount = () => {
      const genre_map = new Map();
      for (let i = 0; i < temp.length; i++) {
        const { genre_names } = temp[i].data;
        for (let j = 0; j < genre_names.length; j++) {
          const genre = genre_names[j];
          if (genre_map.has(genre)) {
            genre_map.set(genre, genre_map.get(genre) + 1);
          } else {
            genre_map.set(genre, 1);
          }
        }
      }
      const sorted_genre_map = [...genre_map].sort((a, b) => b[1] - a[1]);
      setGenreList(sorted_genre_map);
    };
    if (temp && temp.length > 0) {
      getGenreCount();
    }
  }, [temp]);

  return (
    <div className="genre-counter">
      <h2>Genres</h2>
      {genreList && genreList.map((genre, index) => {
        const [key, value] = genre;
        return <p key={index}>{`${key}: ${value}`}</p>
      })}
    </div>
  );
};

export default GenreCounter;
