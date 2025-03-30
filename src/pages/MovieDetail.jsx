import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import languageMap from "../utils/languageMap";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = translations.movieModal[language];

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/movie/${id}?language=${language}`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error("Film verisi alınamadı:", err);
    }
  };

  const fetchCast = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/movie/${id}/credits`,
        API_OPTIONS
      );
      const data = await res.json();
      setCast(data.cast?.slice(0, 6) || []);
    } catch (err) {
      console.error("Oyuncular alınamadı:", err);
    }
  };

  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/movie/${id}/videos`,
        API_OPTIONS
      );
      const data = await res.json();
      const youtubeTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      setTrailerKey(youtubeTrailer?.key || null);
    } catch (err) {
      console.error("Fragman alınamadı:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMovie(), fetchCast(), fetchTrailer()]).finally(() => {
      setLoading(false);
    });
  }, [id, language]);

  if (loading) return <Spinner />;
  if (!movie) return <p className="text-white p-6">Film bulunamadı.</p>;

  return (
    <main className="pt-[100px] px-6 text-white max-w-5xl mx-auto">
      {/* Banner */}
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg mb-6 w-full h-64 object-cover"
        />
      )}

      {/* Başlık */}
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <div className="flex gap-6 text-sm opacity-80 mb-4">
        <span>
          {languageMap[movie.original_language] || movie.original_language}
        </span>
        <span>{movie.release_date?.split("-")[0]}</span>
        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
      </div>

      {/* Açıklama */}
      <p className="mb-8">{movie.overview ? movie.overview : t.noOverview}</p>

      {/* Oyuncular */}
      {cast.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">{t.topCast}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex items-center gap-3 bg-white/10 p-2 rounded"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                      : "/no-avatar.png"
                  }
                  className="w-12 h-12 rounded-full object-cover"
                  alt={actor.name}
                />
                <div>
                  <p className="font-medium">{actor.name}</p>
                  <p className="text-sm text-gray-300">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fragman */}
      {trailerKey && (
        <section className="mt-12 pb-12">
          <h2 className="text-xl font-semibold mb-4">Fragman</h2>

          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default MovieDetail;
