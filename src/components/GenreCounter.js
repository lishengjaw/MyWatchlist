import { useEffect, useState } from "react";
import "../styles/GenreCounter.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreCounter = (props) => {
  const { temp } = props;
  const [genreList, setGenreList] = useState(null);
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
    if (genreList) {
      generatePieChartData();
    }
  }, [genreList]);

  const getGenreCount = () => {
    const genre_map = {};
    for (let i = 0; i < temp.length; i++) {
      const { genre_list } = temp[i].data;
      for (let j = 0; j < genre_list.length; j++) {
        const genre = genre_list[j];
        if (genre_map[genre]) {
          genre_map[genre] += 1;
        } else {
          genre_map[genre] = 1;
        }
      }
    }
    setGenreList(genre_map);
  };

  const generatePieChartData = () => {
    setGenreData({
      ...genreData,
      labels: Object.keys(genreList),
      datasets: [
        {
          data: Object.keys(genreList).map((key) => genreList[key]),
          backgroundColor: Object.keys(genreList).map((genre) =>
            getRandomColor()
          ),
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
