import { createContext, useContext, useState } from "react";

// 1. Context oluştur
const LanguageContext = createContext();

// 2. Provider bileşeni
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("tr-TR");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Kolay erişim hook'u
export const useLanguage = () => useContext(LanguageContext);
