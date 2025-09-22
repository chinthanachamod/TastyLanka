import { logout } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";

type SettingItemProps = {
  icon: string;
  title: string;
  description?: string;
  rightComponent: React.ReactNode;
};

export default function Settings() {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();

  const styles = createStyles(colors, isDark);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
      setIsLoggingOut(true);
      try {
        await logout();
      } catch (err) {
  alert(t("signOutFailed"));
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
  <Text style={styles.sectionHeader}>{t("appearance")}</Text>
        <View style={styles.section}>
          <SettingItem
            icon="moon"
            title={t("darkMode")}
            description={t("darkModeDesc")}
            rightComponent={<ToggleDarkMode />}
          />
        </View>

  <Text style={styles.sectionHeader}>{t("languageRegion")}</Text>
        <View style={styles.section}>
          <SettingItem
            icon="globe"
            title={t("language")}
            description={t("languageDesc")}
            rightComponent={<LanguageSelector />}
          />
          {/* Timezone setting removed for simplicity */}
        </View>

  <Text style={styles.sectionHeader}>{t("notifications")}</Text>
        <View style={styles.section}>
          <SettingItem
            icon="notifications"
            title={t("pushNotifications")}
            description={t("pushNotificationsDesc")}
            rightComponent={<Switch value={true} />}
          />
          <SettingItem
            icon="megaphone"
            title={t("promotionalUpdates")}
            description={t("promotionalUpdatesDesc")}
            rightComponent={<Switch value={true} />}
          />
        </View>

  <Text style={styles.sectionHeader}>{t("support")}</Text>
        <View style={styles.section}>
          <SettingItem
            icon="help-circle"
            title={t("helpCenter")}
            description={t("helpCenterDesc")}
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
          <SettingItem
            icon="document-text"
            title={t("termsOfService")}
            description={t("termsOfServiceDesc")}
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
          <SettingItem
            icon="lock-closed"
            title={t("privacyPolicy")}
            description={t("privacyPolicyDesc")}
            rightComponent={
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            }
          />
        </View>

  <Text style={styles.sectionHeader}>{t("about")}</Text>
        <View style={styles.section}>
          <SettingItem
            icon="information-circle"
            title={t("appVersion")}
            description="1.0.0"
            rightComponent={<></>}
          />
          <TouchableOpacity
            onPress={() => router.push('/ratings' as any)}
            style={{ flex: 1 }}
          >
            <SettingItem
              icon="star"
              title={t("rateApp")}
              description={t("rateAppDesc")}
              rightComponent={
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              }
            />
          </TouchableOpacity>
          {/* About App */}
          <TouchableOpacity
            onPress={() => router.push('/about' as any)}
            style={{ flex: 1 }}
          >
            <SettingItem
              icon="apps"
              title={t("About App and The Developer")}
              description={t("Details about this app")}
              rightComponent={
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              }
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Ionicons name="log-out" size={20} color="#ff3b30" />
          <Text style={styles.logoutText}>{t("signOut")}</Text>
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