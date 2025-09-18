import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import LanguageSelector from "../../components/LanguageSelector";
import ToggleDarkMode from "../../components/ToggleDarkMode";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "@/services/authService";

type SettingItemProps = {
  icon: string;
  title: string;
  description?: string;
  rightComponent: React.ReactNode;
};

export default function Settings() {
  const { colors, isDark } = useTheme();

  const styles = createStyles(colors, isDark);
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

  const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description, rightComponent }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={22} color={colors.accent} />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && <Text style={styles.settingDescription}>{description}</Text>}
        </View>
      </View>
      <View>{rightComponent}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>Appearance</Text>
        <View style={styles.section}>
          <SettingItem
            icon="moon"
            title="Dark Mode"
            description="Switch between light and dark theme"
            rightComponent={<ToggleDarkMode />}
          />
        </View>

        <Text style={styles.sectionHeader}>Language & Region</Text>
        <View style={styles.section}>
          <SettingItem
            icon="globe"
            title="Language"
            description="Select your preferred language"
            rightComponent={<LanguageSelector />}
          />
          <SettingItem
            icon="time"
            title="Timezone"
            description="GMT+02:00"
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
        </View>

        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.section}>
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            description="Receive push notifications"
            rightComponent={<Switch value={true} />}
          />
          <SettingItem
            icon="mail"
            title="Email Notifications"
            description="Receive email notifications"
            rightComponent={<Switch value={false} />}
          />
          <SettingItem
            icon="megaphone"
            title="Promotional Updates"
            description="Get promotional updates"
            rightComponent={<Switch value={true} />}
          />
        </View>

        <Text style={styles.sectionHeader}>Support</Text>
        <View style={styles.section}>
          <SettingItem
            icon="help-circle"
            title="Help Center"
            description="Get help and support"
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
          <SettingItem
            icon="document-text"
            title="Terms of Service"
            description="View terms of service"
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
          <SettingItem
            icon="lock-closed"
            title="Privacy Policy"
            description="View privacy policy"
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
        </View>

        <Text style={styles.sectionHeader}>About</Text>
        <View style={styles.section}>
          <SettingItem
            icon="information-circle"
            title="App Version"
            description="1.2.0"
            rightComponent={<></>}
          />
          <SettingItem
            icon="star"
            title="Rate App"
            description="Leave a rating for the app"
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Ionicons name="log-out" size={20} color="#ff3b30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: {
  bg: string;
  card: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  star: string;
  border: string;
}, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
  backgroundColor: colors.bg,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 24,
      marginBottom: 8,
  color: colors.accent,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 13,
  color: colors.textMuted,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(255,59,48,0.1)" : "rgba(255,59,48,0.1)",
      padding: 16,
      borderRadius: 12,
      marginTop: 24,
      marginBottom: 40,
    },
    logoutText: {
      color: "#ff3b30",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
  });