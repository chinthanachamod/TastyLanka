import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "si" | "ta";
type Dict = Record<string, string>;

const en: Dict = {
  appName: "TastyLanka",
  home: "Home", foods: "Foods", favourites: "Favourites",
  profile: "Profile", settings: "Settings",
  login: "Sign in", register: "Sign up", google: "Continue with Google",
  email: "Email", password: "Password", name: "Full name",
  searchFoods: "Search Sri Lankan dishes...",
  addFav: "Add to Favourites", removeFav: "Remove from Favourites",
  language: "Language", darkMode: "Dark Mode",
  signOut: "Sign Out", signOutFailed: "Failed to sign out.",
  appearance: "Appearance", darkModeDesc: "Switch between light and dark theme",
  languageRegion: "Language & Region", languageDesc: "Select your preferred language",
  notifications: "Notifications", pushNotifications: "Push Notifications", pushNotificationsDesc: "Receive push notifications",
  promotionalUpdates: "Promotional Updates", promotionalUpdatesDesc: "Get promotional updates",
  support: "Support", helpCenter: "Help Center", helpCenterDesc: "Get help and support",
  termsOfService: "Terms of Service", termsOfServiceDesc: "View terms of service",
  privacyPolicy: "Privacy Policy", privacyPolicyDesc: "View privacy policy",
  about: "About", appVersion: "App Version", rateApp: "Rate App", rateAppDesc: "Leave a rating for the app",
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
  signOut: "ඉවත් වන්න", signOutFailed: "ඉවත් වීම අසාර්ථකයි.",
  appearance: "පෙනුම", darkModeDesc: "ආලෝක සහ අඳුරු තේමාව අතර මාරු වන්න",
  languageRegion: "භාෂාව සහ ප්‍රදේශය", languageDesc: "ඔබ කැමති භාෂාව තෝරන්න",
  notifications: "දැනුම්දීම්", pushNotifications: "පිටු දැනුම්දීම්", pushNotificationsDesc: "පිටු දැනුම්දීම් ලබා ගන්න",
  promotionalUpdates: "ප්‍රවර්ධන යාවත්කාලීන", promotionalUpdatesDesc: "ප්‍රවර්ධන යාවත්කාලීන ලබා ගන්න",
  support: "සහාය", helpCenter: "උදව් මධ්‍යස්ථානය", helpCenterDesc: "උදව් සහ සහාය ලබා ගන්න",
  termsOfService: "සේවා කොන්දේසි", termsOfServiceDesc: "සේවා කොන්දේසි බලන්න",
  privacyPolicy: "රහස්‍යතා ප්‍රතිපත්තිය", privacyPolicyDesc: "රහස්‍යතා ප්‍රතිපත්තිය බලන්න",
  about: "ගැන", appVersion: "යෙදුම් අනුවාදය", rateApp: "යෙදුම අගයන්න", rateAppDesc: "යෙදුම සඳහා අගයක් දෙන්න",
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
  signOut: "வெளியேறு", signOutFailed: "வெளியேற முடியவில்லை.",
  appearance: "தோற்றம்", darkModeDesc: "ஒளி மற்றும் இருண்ட தீம்கள் இடையே மாற்றவும்",
  languageRegion: "மொழி மற்றும் பகுதி", languageDesc: "விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்",
  notifications: "அறிவிப்புகள்", pushNotifications: "புஷ் அறிவிப்புகள்", pushNotificationsDesc: "புஷ் அறிவிப்புகளைப் பெறுங்கள்",
  promotionalUpdates: "விளம்பர புதுப்பிப்புகள்", promotionalUpdatesDesc: "விளம்பர புதுப்பிப்புகளைப் பெறுங்கள்",
  support: "ஆதரவு", helpCenter: "உதவி மையம்", helpCenterDesc: "உதவி மற்றும் ஆதரவைப் பெறுங்கள்",
  termsOfService: "சேவை விதிமுறைகள்", termsOfServiceDesc: "சேவை விதிமுறைகளைப் பார்க்கவும்",
  privacyPolicy: "தனியுரிமைக் கொள்கை", privacyPolicyDesc: "தனியுரிமைக் கொள்கையைப் பார்க்கவும்",
  about: "பற்றி", appVersion: "பயன்பாட்டு பதிப்பு", rateApp: "பயன்பாட்டை மதிப்பிடுங்கள்", rateAppDesc: "பயன்பாட்டிற்கு மதிப்பீடு விடுங்கள்",
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
