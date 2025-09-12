import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../services/authService";

export default function Profile() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

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
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <LinearGradient
          colors={["#FFB347", "#FF8000"]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{getInitials(user?.email || "")}</Text>
        </LinearGradient>

        <Text style={[styles.name, { color: colors.text }]}>
          {user?.displayName || "User"}
        </Text>
        <Text style={[styles.email, { color: colors.text + "99" }]}>
          {user?.email}
        </Text>
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
