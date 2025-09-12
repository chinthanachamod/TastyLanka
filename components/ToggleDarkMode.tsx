import React from "react";
import { Switch, View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useI18n } from "../context/I18nContext";

export default function ToggleDarkMode(){
  const { isDark, toggle, colors } = useTheme(); const { t } = useI18n();
  return (
    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingVertical:12}}>
      <Text style={{color: colors.text}}>{t("darkMode")}</Text>
      <Switch value={isDark} onValueChange={toggle} />
    </View>
  );
}
