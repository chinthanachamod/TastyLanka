import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useI18n } from "../context/I18nContext";
import { useTheme } from "../context/ThemeContext";

export default function LanguageSelector(){
  const { lang, setLang, t } = useI18n(); const { colors } = useTheme();
  const btn = (code: "en"|"si"|"ta", label: string) => (
    <TouchableOpacity key={code} onPress={()=>setLang(code)} style={{
      paddingVertical:10, paddingHorizontal:12, borderRadius:12,
      borderWidth:1, borderColor: colors.border,
      backgroundColor: lang===code ? colors.accentMuted : colors.card, marginRight:8
    }}>
      <Text style={{color: lang===code ? colors.text : colors.textMuted}}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Text style={{marginBottom:8, color: colors.text}}>{t("language")}</Text>
      <View style={{flexDirection:"row"}}>{["en","si","ta"].map(code => btn(code as any, code.toUpperCase()))}</View>
    </View>
  );
}
