import { useEffect, useState } from "react";
import "../styles/GenreCounter.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreCounter = (props) => {
  const { temp } = props;
  const [genreList, setGenreList] = useState([]);
  const [genreData, setGenreData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    if (temp && temp.length > 0) {
      getGenreCount();
    }
  }, [temp]);

  useEffect(() => {
    if (genreList && genreList.length > 0) {
      generatePieChartData();
    }
  }, [genreList]);

  const getGenreCount = () => {
    const genre_map = new Map();
    for (let i = 0; i < temp.length; i++) {
      const { genre_list } = temp[i].data;
      for (let j = 0; j < genre_list.length; j++) {
        const genre = genre_list[j];
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

  const generatePieChartData = () => {
    setGenreData({
      ...genreData,
      labels: genreList.map((genre) => genre[0]),
      datasets: [
        {
          data: genreList.map((genre) => genre[1]),
          backgroundColor: genreList.map((genre) => getRandomColor()),
        },
      ],
    });
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="genre-counter">
      <h2>Genres</h2>
      <Doughnut
        data={{
          labels: genreData.labels,
          datasets: genreData.datasets,
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "whitesmoke",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default GenreCounter;
