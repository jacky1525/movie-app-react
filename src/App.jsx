import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import MovieModal from "./components/MovieModal";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Çok dilli başlıklar ve placeholderlar için çeviri objesi
const translations = {
  "tr-TR": {
    headerBefore: "Zahmetsizce Beğeneceğin ",
    highlight: "Filmleri",
    headerAfter: " Bul",
    allMovies: "Tüm Filmler",
    searchPlaceholder: "Binlerce film içinde ara",
  },
  "en-US": {
    headerBefore: "Find ",
    highlight: "Movies",
    headerAfter: " You'll Enjoy Without the Hassle",
    allMovies: "All Movies",
    searchPlaceholder: "Search through thousands of movies",
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [language, setLanguage] = useState("tr-TR");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&language=${language}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&language=${language}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (response.ok) {
        const data = await response.json();
        setMovieList(data.results || []);
      } else {
        throw new Error("Failed to fetch movies");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, language]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        {/* Dil seçim butonları */}
        <div className="absolute top-5 right-5 flex gap-2 z-20">
  <button
    onClick={() => setLanguage("tr-TR")}
    className={`px-3 py-1 rounded font-semibold transition ${
      language === "tr-TR"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    TR
  </button>
  <button
    onClick={() => setLanguage("en-US")}
    className={`px-3 py-1 rounded font-semibold transition ${
      language === "en-US"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    EN
  </button>
</div>


        <header>
          <img
            src="./hero.png"
            className="transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
            alt="Hero Banner"
          />
          <h1>
            {translations[language].headerBefore}
            <span className="text-gradient">
              {translations[language].highlight}
            </span>
            {translations[language].headerAfter}
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={translations[language].searchPlaceholder}
          />
        </header>

        <section className="movies all-movies">
          <h2 className="mt-[40px]">{translations[language].allMovies}</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-white">No movies found.</p>
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

export default App;
