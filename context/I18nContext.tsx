import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Lang = "en" | "si" | "ta";
type Dict = Record<string, string>;

const en: Dict = {
  appName: "Taste of Sri Lanka",
  home: "Home", foods: "Foods", favourites: "Favourites",
  profile: "Profile", settings: "Settings",
  login: "Sign in", register: "Sign up", google: "Continue with Google",
  email: "Email", password: "Password", name: "Full name",
  searchFoods: "Search Sri Lankan dishes...",
  addFav: "Add to Favourites", removeFav: "Remove from Favourites",
  language: "Language", darkMode: "Dark Mode",
};
const si: Dict = {
  appName: "ශ්‍රී ලංකා රස",
  home: "මුල් පිටුව", foods: "ආහාර", favourites: "ප්‍රිය", 
  profile: "පැතිකඩ", settings: "සිටුවම්",
  login: "ඇතුල් වන්න", register: "ලියාපදිංචි වන්න", google: "Google සමඟ",
  email: "ඊමේල්", password: "මුරපදය", name: "පූර්ණ නාමය",
  searchFoods: "ශ්‍රී ලාංකික කෑම සොයන්න...",
  addFav: "ප්‍රියතම වලට එක් කරන්න", removeFav: "ප්‍රියතම වලින් ඉවත් කරන්න",
  language: "භාෂාව", darkMode: "අඳුරු තේමාව",
};
const ta: Dict = {
  appName: "இலங்கையின் சுவை",
  home: "முகப்பு", foods: "உணவு", favourites: "விருப்பங்கள்",
  profile: "சுயவிவரம்", settings: "அமைப்புகள்",
  login: "உள்நுழைக", register: "பதிவு", google: "Google மூலம்",
  email: "மின்னஞ்சல்", password: "கடவுச்சொல்", name: "முழு பெயர்",
  searchFoods: "இலங்கை உணவுகளைத் தேடவும்...",
  addFav: "பிடித்ததில் சேர்", removeFav: "பிடித்ததில் நீக்கு",
  language: "மொழி", darkMode: "டார்க் மோடு",
};

const maps: Record<Lang, Dict> = { en, si, ta };

type I18n = { lang: Lang; t: (k: string) => string; setLang: (l: Lang)=>void; };
const I18nContext = createContext<I18n>({} as I18n);

export const I18nProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("lang");
      if (saved === "en" || saved === "si" || saved === "ta") setLangState(saved);
      else {
        const device = (Localization.getLocales?.()[0]?.languageCode || "en") as Lang;
        setLangState(["si","ta"].includes(device) ? (device as Lang) : "en");
      }
    })();
  }, []);
  const setLang = (l: Lang) => { setLangState(l); AsyncStorage.setItem("lang", l); };
  const t = (k: string) => maps[lang][k] ?? k;
  const value = useMemo(() => ({ lang, t, setLang }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
export const useI18n = () => useContext(I18nContext);
