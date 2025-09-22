import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';

export default function AboutIndex() {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const styles = createStyles(colors, isDark);

  // Profile image configuration
  const [imageError, setImageError] = React.useState(false);

  const handleEmail = () => {
    Linking.openURL('mailto:chinthanachamod50@gmail.com');
  };

  const handleGitHub = () => {
    Linking.openURL('https://github.com/chinthanachamod');
  };

  const handleLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/chinthana-chamod-2a133b323/');
  };

  const InfoCard: React.FC<{ 
    icon: string; 
    title: string; 
    description: string;
    onPress?: () => void;
  }> = ({ icon, title, description, onPress }) => (
    <TouchableOpacity 
      style={styles.infoCard} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={colors.accent} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      {onPress && (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* App Logo and Name */}
        <View style={styles.appSection}>
          <View style={styles.appLogoContainer}>
            <Ionicons name="restaurant" size={60} color={colors.accent} />
          </View>
          <Text style={styles.appName}>TastyLanka</Text>
          <Text style={styles.appTagline}>Discover Authentic Sri Lankan Cuisine</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* App Information */}
        <Text style={styles.sectionHeader}>About The App</Text>
        <View style={styles.section}>
          <InfoCard
            icon="information-circle"
            title="What is TastyLanka?"
            description="TastyLanka is your gateway to authentic Sri Lankan cuisine. Discover traditional recipes, explore local restaurants, and share your culinary experiences with fellow food enthusiasts."
          />
          <InfoCard
            icon="leaf"
            title="Our Mission"
            description="To preserve and promote the rich culinary heritage of Sri Lanka while connecting food lovers from around the world with authentic flavors and recipes."
          />
          <InfoCard
            icon="people"
            title="Community Driven"
            description="Built for food enthusiasts, by food enthusiasts. Share recipes, rate restaurants, and connect with others who share your passion for Sri Lankan cuisine."
          />
        </View>

        {/* Developer Information */}
        <Text style={styles.sectionHeader}>About The Developer</Text>
        <View style={styles.section}>
          <View style={styles.developerCard}>
            <View style={styles.developerAvatar}>
              {!imageError ? (
                <Image 
                  source={require('../../assets/images/Developer img.jpg')} // Update with your image path
                  style={styles.profileImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <Ionicons name="person" size={40} color={colors.accent} />
              )}
            </View>
            <View style={styles.developerInfo}>
              <Text style={styles.developerName}>Chinthana Chamod</Text>
              <Text style={styles.developerRole}>Mobile App Developer</Text>
              <Text style={styles.developerDescription}>
                Passionate mobile app developer currently studying Advanced Mobile Application Development at IJSE. 
                I love creating clean, functional, and user-friendly applications that bring ideas to life.
              </Text>
            </View>
          </View>

          <InfoCard
            icon="mail"
            title="Get in Touch"
            description="chinthanachamod50@gmail.com"
            onPress={handleEmail}
          />
          <InfoCard
            icon="logo-github"
            title="GitHub"
            description="View my projects and contributions"
            onPress={handleGitHub}
          />
          <InfoCard
            icon="logo-linkedin"
            title="LinkedIn"
            description="Connect with me professionally"
            onPress={handleLinkedIn}
          />
        </View>

        {/* Features */}
        <Text style={styles.sectionHeader}>Key Features</Text>
        <View style={styles.section}>
          <InfoCard
            icon="search"
            title="Discover Foods"
            description="Browse through a curated collection of authentic Sri Lankan dishes and recipes"
          />
          <InfoCard
            icon="heart"
            title="Save Favorites"
            description="Keep track of your favorite dishes and restaurants for quick access"
          />
          <InfoCard
            icon="star"
            title="Rate & Review"
            description="Share your experiences and help others discover great food"
          />
          <InfoCard
            icon="globe"
            title="Multi-language Support"
            description="Available in multiple languages to serve our diverse community"
          />
        </View>

        {/* Technical Details */}
        <Text style={styles.sectionHeader}>Technical Information</Text>
        <View style={styles.section}>
          <InfoCard
            icon="phone-portrait"
            title="Built with React Native"
            description="Cross-platform mobile application using modern React Native and Expo"
          />
          <InfoCard
            icon="cloud"
            title="Firebase Backend"
            description="Powered by Google Firebase for real-time data and secure authentication"
          />
          <InfoCard
            icon="color-palette"
            title="Dark Mode Support"
            description="Adaptive design that works beautifully in both light and dark themes"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for Sri Lankan food lovers
          </Text>
          <Text style={styles.copyright}>
            © 2024 TastyLanka. All rights reserved.
          </Text>
        </View>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: colors.bg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    appSection: {
      alignItems: 'center',
      marginBottom: 32,
      paddingVertical: 24,
    },
    appLogoContainer: {
      width: 100,
      height: 100,
      borderRadius: 25,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    appTagline: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 8,
    },
    version: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '500',
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 24,
      marginBottom: 12,
      color: colors.text,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    infoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.textMuted,
      lineHeight: 20,
    },
    developerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    developerAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      overflow: 'hidden',
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    developerInfo: {
      flex: 1,
    },
    developerName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    developerRole: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '500',
      marginBottom: 8,
    },
    developerDescription: {
      fontSize: 14,
      color: colors.textMuted,
      lineHeight: 20,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
      marginTop: 24,
    },
    footerText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    copyright: {
      fontSize: 12,
      color: colors.textMuted,
      textAlign: 'center',
    },
  });