import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ColorSchemeName} from "react-native";

type Theme = {
  isDark: boolean;
  colors: {
    bg: string; card: string; surface: string; text: string; textMuted: string;
    accent: string; accentMuted: string; star: string; border: string;
  };
  toggle: () => void;
};

const light = {
  bg: "#ffffff",                 // bg-white
  card: "#f9fafb",               // bg-gray-50
  surface: "#f3f4f6",            // bg-gray-100
  text: "#111827",               // text-gray-900
  textMuted: "#4b5563",          // text-gray-600
  accent: "#fb923c",             // orange-400/500
  accentMuted: "#fed7aa",        // orange-100
  star: "#facc15",               // yellow-400
  border: "#e5e7eb"
};
const dark = {
  bg: "#111827",                 // bg-gray-900
  card: "#1f2937",               // bg-gray-800
  surface: "#374151",            // bg-gray-700
  text: "#ffffff",               // text-white
  textMuted: "#d1d5db",          // text-gray-300
  accent: "#fb923c",
  accentMuted: "#78350f",
  star: "#facc15",
  border: "#374151"
};

const ThemeContext = createContext<Theme>({} as Theme);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => { AsyncStorage.getItem("theme").then(v => setIsDark(v === "dark")); }, []);
  useEffect(() => { AsyncStorage.setItem("theme", isDark ? "dark" : "light"); }, [isDark]);

  const value = useMemo(() => ({
    isDark,
    colors: isDark ? dark : light,
    toggle: () => setIsDark(v => !v)
  }), [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);
