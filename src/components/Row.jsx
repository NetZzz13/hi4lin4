import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { instance } from "../api/api";
import "../scss/Row.scss";
import movieTrailer from "movie-trailer";
import nocover from "../nocover.jpg"

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const getData = async () => {
    await instance.get(fetchUrl).then((data) => setMovies(data.data.results));
  };

  useEffect(() => {
    getData();
    console.log(movies)
  }, [fetchUrl]);
  //[fetchUrl] - because fetchUrl is a variable, it's not a state

  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    trailerUrl
      ? setTrailerUrl("")
      : movieTrailer(movie?.name || movie?.title || "")
          //  https://www.youtube.com/watch?v=LeBl6ir2K2I
          // берём из url параметр "LeBl6ir2K2I" после "v"
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${BASE_IMAGE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path 
            }`}
            alt={movie.name}
            key={movie.id}
            onClick={() => handleClick(movie)}
            title={movie.name || movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
