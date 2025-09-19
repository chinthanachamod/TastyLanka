import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";
import { register as signUpEmail } from "../../services/authService";

const { width, height } = Dimensions.get("window");

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
      router.back();
    } catch (e: any) {
      console.error(e);
      setErr(e.message);
      Alert.alert(t("registerFailed") || "Registration Failed", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name && email && password && confirmPassword;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=1200&fit=crop"
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo/Title Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#ff7f00', '#ff7f00']} // orange only
                  style={styles.logoGradient}
                >
                  <Ionicons name="person-add" size={40} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join us today and get started in minutes</Text>
            </View>

            {/* Registration Form */}
            <BlurView intensity={20} tint="light" style={styles.formContainer}>
              <View style={styles.formInner}>
                {/* Full Name Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="person-outline" size={20} color={colors.textMuted} />
                  </View>
                  <TextInput
                    placeholder={t("fullName")}
                    placeholderTextColor={colors.textMuted}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    style={[styles.input, { color: '#000' }]}
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
                  </View>
                  <TextInput
                    placeholder={t("email")}
                    placeholderTextColor={colors.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={[styles.input, { color: '#000' }]}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
                  </View>
                  <TextInput
                    placeholder={t("password")}
                    placeholderTextColor={colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[styles.input, { color: '#000' }]}
                  />
                  <TouchableOpacity 
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={colors.textMuted} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="shield-checkmark-outline" size={20} color={colors.textMuted} />
                  </View>
                  <TextInput
                    placeholder={t("confirmPassword")}
                    placeholderTextColor={colors.textMuted}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    style={[styles.input, { color: '#000' }]}
                  />
                  <TouchableOpacity 
                    style={styles.passwordToggle}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={colors.textMuted} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Error Message */}
                {!!err && (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={16} color="#ff4757" />
                    <Text style={styles.errorText}>{err}</Text>
                  </View>
                )}

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <View style={styles.passwordStrengthContainer}>
                    <View style={styles.passwordStrengthBar}>
                      <View 
                        style={[
                          styles.passwordStrengthFill,
                          { 
                            width: `${Math.min((password.length / 8) * 100, 100)}%`,
                            backgroundColor: password.length < 4 ? '#ff4757' : 
                                           password.length < 6 ? '#ffa502' : '#2ed573'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.passwordStrengthText}>
                      {password.length < 4 ? 'Weak' : 
                       password.length < 6 ? 'Fair' : 'Strong'} password
                    </Text>
                  </View>
                )}

                {/* Terms & Conditions */}
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.registerButton}
                  disabled={isLoading || !isFormValid}
                >
                  <LinearGradient
                    colors={isLoading || !isFormValid ? ['#ccc', '#999'] : ['#ff7f00', '#ff7f00']}
                    style={styles.registerButtonGradient}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.registerButtonText}>{t("register")}</Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Google Button */}
                <TouchableOpacity
                  disabled
                  style={[styles.socialButton, { opacity: 0.6 }]}
                >
                  <Ionicons name="logo-google" size={20} color="#EA4335" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <Link href="./login" style={styles.loginLink}>
                    {t("login")}
                  </Link>
                </View>
              </View>
            </BlurView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  formInner: {
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.5)', // black with reduced opacity
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  passwordStrengthContainer: {
    marginBottom: 16,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: '#e1e8ed',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    color: '#8899a6',
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#8899a6',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#ff7f00',
    fontWeight: '600',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#ff7f00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  registerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e8ed',
  },
  dividerText: {
    color: '#8899a6',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#8899a6',
    fontSize: 14,
  },
  loginLink: {
    color: '#ff7f00',
    fontSize: 14,
    fontWeight: '600',
  },
});


