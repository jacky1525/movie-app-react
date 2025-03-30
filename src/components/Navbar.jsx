import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";



const Navbar = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();


  const navItemClass = (path) =>
    `transition hover:text-purple-400 ${
      location.pathname === path ? "text-purple-500 font-semibold" : ""
    }`;

  return (
    <nav className="bg-black/60 backdrop-blur-md shadow-md py-4 px-8 flex items-center justify-between fixed w-full top-0 z-50">
      <Link to="/" className="text-white text-xl font-bold tracking-wide">
        🎬 MovieHub
      </Link>

      <div className="flex items-center gap-8 text-white">
        <Link to="/" className={navItemClass("/")}>{translations.navbar[language].home}</Link>
        <Link to="/favorites" className={navItemClass("/favorites")}>{translations.navbar[language].favorites}</Link>
        <Link to="/profile" className={navItemClass("/profile")}>{translations.navbar[language].profile}</Link>

        {/* Dil Seçici */}
        <div className="flex gap-2 ml-6">
          <button
            onClick={() => setLanguage("tr-TR")}
            className={`px-3 py-1 rounded text-sm font-semibold transition ${
              language === "tr-TR"
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLanguage("en-US")}
            className={`px-3 py-1 rounded text-sm font-semibold transition ${
              language === "en-US"
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
