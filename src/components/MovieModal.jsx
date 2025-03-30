import React, { useEffect, useState } from "react";
import languageMap from "../utils/languageMap";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w92";

const MovieModal = ({ movie, onClose }) => {
  const [cast, setCast] = useState([]);
  const { language } = useLanguage();
  const t = translations.movieModal[language];
  const navigate = useNavigate();

  useEffect(() => {
    if (!movie?.id) return;

    const fetchCast = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setCast(data.cast?.slice(0, 6) || []);
      } catch (error) {
        console.error("Failed to fetch cast", error);
      }
    };

    fetchCast();
  }, [movie]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-100 rounded-2xl max-w-4xl w-full relative overflow-hidden shadow-lg text-white">
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-2xl transition"
        >
          ✖
        </button>

        {/* Backdrop Görsel */}
        {movie.backdrop_path && (
          <img
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt="Backdrop"
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">{movie.title}</h2>

          <div className="flex gap-4 text-sm text-gray-300">
            <span>
              {languageMap[movie.original_language] || movie.original_language}
            </span>
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>

          <p className="text-white text-sm mt-2">
            {movie.overview ? movie.overview : t.noOverview}
          </p>

          {/* Oyuncular */}
          {cast.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white text-lg font-semibold mb-2">
                {t.topCast}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex items-center gap-3 bg-white/5 p-2 rounded-lg"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `${PROFILE_BASE_URL}${actor.profile_path}`
                          : "/no-avatar.png"
                      }
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {actor.name}
                      </p>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-start mt-6">
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
             {t.goToDetail}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
