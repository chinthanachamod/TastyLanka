import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";
import { login as signInEmail } from "../../services/authService";

export default function Login() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors } = useTheme();

  // State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle login
  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setErr("");
    try {
      await signInEmail(email.trim(), password);
      router.push("/(tabs)/home"); // ✅ Navigate to home after login
    } catch (e: any) {
      console.error(e);
      setErr(e.message);
      Alert.alert(t("loginFailed"), t("invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>{t("appName")}</Text>

      {/* Email */}
      <TextInput
        placeholder={t("email")}
        placeholderTextColor={colors.textMuted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      {/* Password */}
      <TextInput
        placeholder={t("password")}
        placeholderTextColor={colors.textMuted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      {/* Error Message */}
      {!!err && <Text style={{ color: "red", marginBottom: 8 }}>{err}</Text>}

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.btn, { backgroundColor: colors.accent }]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>{t("login")}</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <Link
        href="./register"
        style={{ color: colors.accent, marginTop: 12, textAlign: "center" }}
      >
        {t("register")}
      </Link>

      <View style={{ height: 24 }} />

      {/* Google Button */}
      <TouchableOpacity
        disabled
        style={[styles.btnOutline, { borderColor: colors.accent }]}
      >
        <Ionicons name="logo-google" size={18} color={colors.textMuted} />
        <Text style={{ color: colors.textMuted }}>{t("google")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  btn: { padding: 14, borderRadius: 14, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  btnOutline: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});

