import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { language } = useLanguage();
  const translation = translations.profile[language];

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    localStorage.setItem("userProfile", JSON.stringify(userData));
    alert("Profil bilgileri kaydedildi!");
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-white/10 rounded-lg  text-white shadow-lg">
      <h2 className="text-2xl mb-4 text-center">{translation.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={translation.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          placeholder={translation.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
        >
          {translation.button}{" "}
        </button>
      </form>

      <div className="flex justify-center mt-12">
        <p className="text-red-500 text-xl font-semibold text-center">
          {translation.underConstruction}
        </p>
      </div>
    </div>
  );
};

export default Profile;
