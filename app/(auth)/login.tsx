import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
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

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setErr("");
    try {
      await signInEmail(email.trim(), password);
      router.push("/(tabs)/home");
    } catch (e: any) {
      console.error(e);
      setErr(e.message);
      Alert.alert(t("loginFailed"), t("invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=1200&fit=crop" }} // Orange sunset BG
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Ionicons name="shield-checkmark" size={40} color="#fff" />
        </View>

        {/* Title */}
        <Text style={styles.title}>{t("appName")}</Text>

        {/* Email Input */}
        <TextInput
          placeholder={t("email")}
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder={t("password")}
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity 
            onPress={toggleShowPassword}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={22} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>

        {/* Error */}
        {!!err && <Text style={styles.error}>{err}</Text>}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.loginButton,
            { backgroundColor: isLoading ? "#ffa64d" : "#FF8000" },
          ]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>{t("login")}</Text>
          )}
        </TouchableOpacity>

        {/* Register Link */}
        <Link href="./register" style={styles.registerLink}>
          {t("register")}
        </Link>

        <View style={{ height: 24 }} />

        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={18} color="#333" />
          <Text style={styles.googleButtonText}>{t("google")}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const ORANGE = "#FF8000";

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ORANGE,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: ORANGE,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ORANGE,
    marginBottom: 12,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ORANGE,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  error: { color: "red", marginBottom: 8, textAlign: "center" },
  loginButton: {
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  registerLink: {
    color: ORANGE,
    marginTop: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  googleButton: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  googleButtonText: { color: "#333", fontWeight: "600" },
});