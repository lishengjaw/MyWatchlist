import { useEffect, useState } from "react";
import "./GenreCounter.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getRandomColor } from "../../helpers/UtilityController";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreCounter = ({ temp }) => {
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
    getGenreCount();
  }, [temp]);

  useEffect(() => {
    const generatePieChartData = () => {
      setGenreData({
        ...genreData,
        labels: Object.keys(genreList),
        datasets: [
          {
            data: Object.values(genreList),
            backgroundColor: Object.keys(genreList).map((genre) =>
              getRandomColor()
            ),
          },
        ],
      });
    };
    if (genreList) {
      generatePieChartData();
    }
  }, [genreList]);

  return (
    <div className="genre-counter p-3">
      <h2 className="text-light mb-3">Genres</h2>
      <Doughnut
        data={{
          labels: genreData.labels,
          datasets: genreData.datasets,
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default GenreCounter;
