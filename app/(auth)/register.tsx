import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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
import { register as signUpEmail } from "../../services/authService";

export default function Register() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors } = useTheme();

  // States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle Register
  const handleRegister = async () => {
    if (isLoading) return;
    if (password !== confirmPassword) {
      setErr(t("passwordMismatch") || "Passwords do not match");
      return;
    }
    setIsLoading(true);
    setErr("");
    try {
      await signUpEmail(name, email.trim(), password, confirmPassword);
      router.back(); // ✅ Go back to login after register
    } catch (e: any) {
      console.error(e);
      setErr(e.message);
      Alert.alert(t("registerFailed") || "Registration Failed", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>{t("register")}</Text>

      {/* Name */}
      <TextInput
        placeholder={t("fullName")}
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

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

      {/* Confirm Password */}
      <TextInput
        placeholder={t("confirmPassword")}
        placeholderTextColor={colors.textMuted}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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

      {/* Error */}
      {!!err && <Text style={{ color: "red", marginBottom: 8 }}>{err}</Text>}

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.btn, { backgroundColor: colors.accent }]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>{t("register")}</Text>
        )}
      </TouchableOpacity>

      {/* Back to Login */}
      <Link
        href="./login"
        style={{ color: colors.accent, marginTop: 12, textAlign: "center" }}
      >
        {t("login")}
      </Link>

      <View style={{ height: 24 }} />

      {/* Google Register Button */}
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
