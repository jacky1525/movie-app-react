import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import React, { useState } from "react";
import MovieModal from "../components/MovieModal";


const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate(); // ✅ burada tanımlanmalı
  const { language } = useLanguage();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const t = translations.favorites[language];

  return (
    <div className="pt-[100px] p-6 text-white">
      <h1 className="text-4xl mb-4">{t.title}</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-lg text-white mb-4">{t.empty}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {t.button}
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </ul>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Favorites;
