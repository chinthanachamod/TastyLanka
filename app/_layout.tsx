import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { I18nProvider } from "../context/I18nContext";
import { ThemeProvider } from "../context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function Gate() {
  const { loading } = useAuth();
  
  React.useEffect(() => { 
    if (!loading) {
      // Add a small delay to ensure custom splash screen shows properly
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loading]);
  
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
