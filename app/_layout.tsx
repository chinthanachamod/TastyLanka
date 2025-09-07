import { Stack, SplashScreen } from "expo-router";
import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { I18nProvider } from "../context/I18nContext";

SplashScreen.preventAutoHideAsync();

function Gate() {
  const { loading } = useAuth();
  React.useEffect(() => { if (!loading) SplashScreen.hideAsync(); }, [loading]);
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Gate />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
