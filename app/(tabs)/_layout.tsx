import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";
import React from "react";

export default function Layout() {
  const { user } = useAuth(); if (!user) return <Redirect href="../(auth)/login" />;
  const { colors, isDark } = useTheme(); const { t } = useI18n();

  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle:{ backgroundColor: colors.card, borderTopColor: colors.border }
    }}>
      <Tabs.Screen name="home" options={{ title: t("home"), tabBarIcon: ({color,size}) => <Ionicons name="home" color={color} size={size}/> }} />
      <Tabs.Screen name="foods/index" options={{ title: t("foods"), tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="food" color={color} size={size}/> }} />
      <Tabs.Screen name="favourites" options={{ title: t("favourites"), tabBarIcon: ({color,size}) => <Ionicons name="heart" color={color} size={size}/> }} />
      <Tabs.Screen name="profile" options={{ title: t("profile"), tabBarIcon: ({color,size}) => <Ionicons name="person" color={color} size={size}/> }} />
      <Tabs.Screen name="settings" options={{ title: t("settings"), tabBarIcon: ({color,size}) => <Ionicons name="settings" color={color} size={size}/> }} />
    </Tabs>
  );
}
