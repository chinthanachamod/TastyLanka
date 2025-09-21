import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FoodCard from "../../components/FoodCard";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../services/authService";
import { getFoodsByUser } from "../../services/foodService";
import { getUserProfile } from "../../services/userService";

export default function Profile() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [myFoods, setMyFoods] = useState<any[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then((profile) => {
        setFullName(profile?.fullName || "");
        if (profile?.fullName) {
          setLoadingFoods(true);
          getFoodsByUser(profile.fullName).then((foods) => {
            setMyFoods(foods);
            setLoadingFoods(false);
          });
        }
      });
    }
  }, [user?.uid]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      alert("Failed to sign out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (email: string) => {
    if (!email) return "U";
    const parts = email.split("@")[0].split(".");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : email[0].toUpperCase();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>...
      <View style={styles.header}>
        <LinearGradient
          colors={["#FFB347", "#FF8000"]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{getInitials(user?.email || "")}</Text>
        </LinearGradient>

        <Text style={[styles.name, { color: colors.text }]}> 
          {fullName || user?.displayName || "User"}
        </Text>
        <Text style={[styles.email, { color: colors.text + "99" }]}>
          {user?.email}
        </Text>
      </View>

      {/* My Foods List */}
      <View style={{ width: "100%", marginTop: 24 }}>
        <Text style={{ color: colors.text, fontWeight: "700", fontSize: 18, marginBottom: 10 }}>
          My Foods
        </Text>
        {loadingFoods ? (
          <ActivityIndicator color={colors.accent} />
        ) : myFoods.length === 0 ? (
          <Text style={{ color: colors.textMuted, fontStyle: "italic" }}>No foods added yet.</Text>
        ) : (
          <FlatList
            data={myFoods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FoodCard
                item={item}
                onPress={() => router.push(`/(tabs)/foods/${item.id}`)}
                onHeart={() => {}}
                isFav={false}
              />
            )}
            contentContainerStyle={{ gap: 12 }}
            style={{ width: "100%" }}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        <LinearGradient
          colors={["#FF8000", "#FFB347"]}
          style={styles.logoutGradient}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 40 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#FF8000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  avatarText: { fontSize: 40, fontWeight: "800", color: "#fff" },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  email: { fontSize: 16 },
  logoutButton: { width: "100%", borderRadius: 14, overflow: "hidden" },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  logoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
