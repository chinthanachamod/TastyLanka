import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
export default function Loader(){
  const { colors } = useTheme();
  return <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor: colors.bg}}>
    <ActivityIndicator size="large" />
  </View>;
}
