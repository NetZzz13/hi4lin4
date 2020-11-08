import React, { useEffect, useState } from "react";
import { instance, requests } from "../api/api";
import "../scss/Banner.scss";
import { truncate } from "../utils/utils";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const fetchData = async () => {
    await instance
      .get(requests.fetchNetflixOriginals)
      .then((films) =>
        setMovie(
          films.data.results[
            Math.floor(Math.random() * (films.data.results.length - 1))
          ]
        )
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
