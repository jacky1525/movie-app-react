import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "react-use";
import MovieModal from "../components/MovieModal";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { fetchMovies } from "../services/movieService";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { language } = useLanguage();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchAndSetMovies =  useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const movies = await fetchMovies(debouncedSearchTerm, language);
      setMovieList(movies);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, language]);

  useEffect(() => {
    fetchAndSetMovies();
  }, [fetchAndSetMovies]);
  
  
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        <header>
          <img
            src="./hero.png"
            className="transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
            alt="Hero Banner"
          />
          <h1>
            {translations.home[language].headerBefore}
            <span className="text-gradient">
              {translations.home[language].highlight}
            </span>
            {translations.home[language].headerAfter}
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={translations.home[language].searchPlaceholder}
          />
        </header>

        <section className="movies all-movies">
          <h2 className="mt-[40px]">{translations.home[language].allMovies}</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-white">{translations.home[language].errorSearchMovies}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
};

export default Home;
