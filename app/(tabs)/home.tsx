// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Video, ResizeMode } from "expo-av";
// import { LinearGradient } from "expo-linear-gradient";
// import { useTheme } from "../../context/ThemeContext";
// import { useI18n } from "../../context/I18nContext";

// export default function Home() {
//   const { colors } = useTheme();
//   const { t } = useI18n();

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.bg }}>
//       {/* Header with background video */}
//       <View
//         style={{
//           height: 220,
//           overflow: "hidden",
//           borderBottomLeftRadius: 22,
//           borderBottomRightRadius: 22,
//         }}
//       >
//         <Video
//           source={require("../../assets/videos/home.mp4")}
//           style={{ width: "100%", height: "100%" }}
//           resizeMode={ResizeMode.COVER}
//           isLooping
//           shouldPlay
//           isMuted
//         />
//         <LinearGradient
//           colors={["rgba(0,0,0,0.5)", "transparent"]}
//           style={StyleSheet.absoluteFillObject}
//         />
//         <Text
//           style={{
//             position: "absolute",
//             bottom: 16,
//             left: 16,
//             color: "#fff",
//             fontSize: 22,
//             fontWeight: "800",
//           }}
//         >
//           {t("appName")}
//         </Text>
//       </View>

//       {/* Placeholder content */}
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 20,
//         }}
//       >
//         <Text
//           style={{
//             color: colors.text,
//             fontSize: 18,
//             fontWeight: "600",
//             textAlign: "center",
//             marginBottom: 8,
//           }}
//         >
//           {t("Welcome to TastyLanka!")}
//         </Text>
//         <Text
//           style={{
//             color: colors.textMuted,
//             fontSize: 14,
//             textAlign: "center",
//           }}
//         >
//           {t("noFoodsYet")}
//         </Text>
//       </View>
//     </View>
//   );
// }

import { MaterialIcons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext"; 
import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get('window');

export default function Home() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");
  const { user } = useAuth(); // logged-in user
  const [userName, setUserName] = useState("User"); // fallback

  useEffect(() => {
    // Fetch logged-in user's name if available
    if (user) {
      setUserName(user.displayName || user.email || "User");
    }
  }, [user]);

  // Sample featured dishes
  const featuredDishes = [
    { id: 1, name: "Chicken Curry", image: "https://cookstrap.com/storage/images/T1ov27pBOVXpmmYi2RECo9L5Y81hzEuzF0kBWbgl.jpg?w=400", rating: 4.8, time: "45 min" },
    { id: 2, name: "Hoppers", image: "https://i0.wp.com/www.lavenderandlovage.com/wp-content/uploads/2016/05/Sri-Lankan-Egg-Hoppers-for-Breakfast.jpg?fit=1200%2C901&ssl=1?w=400", rating: 4.6, time: "30 min" },
    { id: 3, name: "String Hoppers", image: "https://tb-static.uber.com/prod/image-proc/processed_images/b895a684f043c79d93790099b39bd22c/820883a48567670acbd720bc76391291.jpeg?w=400", rating: 4.9, time: "25 min" },
    { id: 4, name: "Kottu Roti", image: "https://www.nestleprofessional.in/sites/default/files/2022-08/Kottu-756x471.jpg?w=400", rating: 4.9, time: "25 min" }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header with background video */}
      <View style={{ height: 280, overflow: "hidden", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <Video
          source={require("../../assets/videos/home.mp4")}
          style={{ width: "100%", height: "100%" }}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent", "rgba(0,0,0,0.4)"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <Text style={{ color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 5 }}>
            {t("appName")}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
            Discover authentic Sri Lankan flavors
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 15 }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: "700", marginBottom: 5 }}>
            Welcome back, {userName}!
          </Text>
          <Text style={{ color: colors.textMuted, fontSize: 16 }}>
            What would you like to cook or eat today?
          </Text>
        </View>

        {/* Featured Dishes Section */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 15 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700" }}>Featured Dishes</Text>
            <TouchableOpacity>
              <Text style={{ color: colors.accent, fontWeight: "600" }}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
            {featuredDishes.map((dish) => (
              <View key={dish.id} style={{ width: width * 0.65, backgroundColor: colors.card, borderRadius: 20, marginRight: 15, overflow: "hidden" }}>
                <Image source={{ uri: dish.image }} style={{ width: "100%", height: 150 }} resizeMode="cover" />
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80 }} />
                <View style={{ padding: 15 }}>
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 5 }}>{dish.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="star" size={14} color="#FFD700" />
                    <Text style={{ color: "#fff", fontSize: 12, marginLeft: 5, marginRight: 15 }}>{dish.rating}</Text>
                    <MaterialIcons name="schedule" size={14} color="#fff" />
                    <Text style={{ color: "#fff", fontSize: 12, marginLeft: 5 }}>{dish.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
