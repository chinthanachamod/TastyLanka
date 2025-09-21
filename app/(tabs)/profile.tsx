import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FoodCard from "../../components/FoodCard";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../services/authService";
import { getFoodsByUser } from "../../services/foodService";
import { getUserProfile, updateUserProfile } from "../../services/userService";

type ProfileInfo = {
  fullName?: string;
  dateOfBirth?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
};

export default function Profile() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profile, setProfile] = useState<ProfileInfo>({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProfile, setEditProfile] = useState<ProfileInfo>({});
  const [savingProfile, setSavingProfile] = useState(false);
  const [myFoods, setMyFoods] = useState<any[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid).then((profileData) => {
        setProfile(profileData || {});
        setEditProfile(profileData || {});
        if (profileData?.fullName) {
          setLoadingFoods(true);
          getFoodsByUser(profileData.fullName).then((foods) => {
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
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ alignItems: "center", padding: 20 }}>
      <View style={styles.header}>
        <LinearGradient
          colors={["#FFB347", "#FF8000"]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{getInitials(user?.email || "")}</Text>
        </LinearGradient>

        <Text style={[styles.name, { color: colors.text }]}> 
          {profile.fullName || user?.displayName || "User"}
        </Text>
        <Text style={[styles.email, { color: colors.text + "99" }]}> 
          {user?.email}
        </Text>
        {profile.dateOfBirth && (
          <Text style={[styles.info, { color: colors.text }]}>DOB: {profile.dateOfBirth}</Text>
        )}
        {profile.country && (
          <Text style={[styles.info, { color: colors.text }]}>Country: {profile.country}</Text>
        )}
        {profile.phoneNumber && (
          <Text style={[styles.info, { color: colors.text }]}>Phone: {profile.phoneNumber}</Text>
        )}
        <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
          <Ionicons name="create-outline" size={18} color={colors.accent} />
          <Text style={{ color: colors.accent, marginLeft: 6 }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text, marginBottom: 8, alignSelf: "flex-start" }}>My Foods</Text>
      {loadingFoods ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <FlatList
          data={myFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard
              item={item}
              onPress={() => router.push(`/foods/${item.id}`)}
              onHeart={() => {}}
              isFav={false}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%", marginBottom: 24 }}
          contentContainerStyle={{ gap: 12 }}
          ListEmptyComponent={<Text style={{ color: colors.textMuted }}>No foods added yet.</Text>}
        />
      )}

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

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}> 
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16, color: colors.text }}>Edit Profile</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
              placeholder="Full Name"
              placeholderTextColor={colors.textMuted}
              value={editProfile.fullName || ""}
              onChangeText={(t) => setEditProfile((p) => ({ ...p, fullName: t }))}
            />
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
              placeholder="Date of Birth (YYYY-MM-DD)"
              placeholderTextColor={colors.textMuted}
              value={editProfile.dateOfBirth || ""}
              onChangeText={(t) => setEditProfile((p) => ({ ...p, dateOfBirth: t }))}
            />
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
              placeholder="Country"
              placeholderTextColor={colors.textMuted}
              value={editProfile.country || ""}
              onChangeText={(t) => setEditProfile((p) => ({ ...p, country: t }))}
            />
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.accent }]}
              placeholder="Phone Number"
              placeholderTextColor={colors.textMuted}
              value={editProfile.phoneNumber || ""}
              onChangeText={(t) => setEditProfile((p) => ({ ...p, phoneNumber: t }))}
              keyboardType="phone-pad"
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16, gap: 12 }}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={[styles.modalButton, { backgroundColor: colors.bg }]}>
                <Text style={{ color: colors.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  setSavingProfile(true);
                  try {
                    if (user?.uid) {
                      await updateUserProfile(user.uid, editProfile);
                      setProfile(editProfile);
                      setEditModalVisible(false);
                    }
                  } catch (e) {
                    alert("Failed to update profile");
                  } finally {
                    setSavingProfile(false);
                  }
                }}
                style={[styles.modalButton, { backgroundColor: colors.accent }]}
                disabled={savingProfile}
              >
                <Text style={{ color: "#fff" }}>{savingProfile ? "Saving..." : "Save"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  logoutButton: { width: "100%", borderRadius: 14, overflow: "hidden", marginTop: 24 },
  info: { fontSize: 14, marginTop: 2 },
  editButton: { flexDirection: "row", alignItems: "center", marginTop: 10, alignSelf: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: 320, borderRadius: 16, padding: 20 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  logoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});