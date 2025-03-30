import React from "react";
import languageMap from "../utils/languageMap";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = ({ movie, onClick }) => {
  const { title, vote_average, poster_path, release_date, original_language } =
    movie;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const toggleFavorite = () => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };
  return (
    <div className="movie-card cursor-pointer">
      <img
        onClick={onClick}
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        loading="lazy"
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">
            {languageMap[original_language] || original_language}
          </p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>{" "}
          <span>•</span>
          <button onClick={toggleFavorite}>
            {isFavorite(movie.id) ? "💖" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
