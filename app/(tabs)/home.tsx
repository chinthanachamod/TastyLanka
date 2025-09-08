import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { useI18n } from "../../context/I18nContext";

export default function Home() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header with background video */}
      <View
        style={{
          height: 220,
          overflow: "hidden",
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
        }}
      >
        <Video
          source={require("../../assets/videos/home.mp4")}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "transparent"]}
          style={StyleSheet.absoluteFillObject}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            color: "#fff",
            fontSize: 22,
            fontWeight: "800",
          }}
        >
          {t("appName")}
        </Text>
      </View>

      {/* Placeholder content */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {t("welcomeMessage")}
        </Text>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {t("noFoodsYet")}
        </Text>
      </View>
    </View>
  );
}
