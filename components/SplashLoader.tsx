import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashLoaderProps {
  isVisible: boolean;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ isVisible }) => {
  const { colors, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      // Initial fade in and scale animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Continuous pulse animation
      const startPulse = () => {
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(startPulse);
      };
      startPulse();
    } else {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          opacity: fadeAnim,
        }
      ]}
    >
      <LinearGradient
        colors={isDark ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) }
            ],
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 40,
            maxWidth: width,
            maxHeight: height,
          }}
        >
          {/* Main Logo */}
          <Image
            source={require('@/assets/images/app logo.png')}
            style={{
              width: Math.min(width * 0.6, 300), // 60% of screen width, max 300px
              height: Math.min(height * 0.3, 300), // 30% of screen height, max 300px
              marginBottom: 20,
            }}
            resizeMode="contain"
          />
          
          {/* App Name */}
          <Animated.Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10,
              letterSpacing: 2,
              textAlign: 'center',
            }}
          >
            TastyLanka
          </Animated.Text>
          
          {/* Subtitle */}
          <Animated.Text
            style={{
              fontSize: 16,
              color: colors.textMuted,
              marginTop: 8,
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            🍛 Discover Sri Lankan Cuisine
          </Animated.Text>
          
          {/* Loading dots animation */}
          <View style={{ 
            flexDirection: 'row', 
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {[0, 1, 2].map((index) => (
              <LoadingDot key={index} delay={index * 200} color={colors.accent} />
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

// Loading dot component with animated bounce
const LoadingDot: React.FC<{ delay: number; color: string }> = ({ delay, color }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(animate, 600);
      });
    };

    setTimeout(animate, delay);
  }, [delay]);

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: color || '#ff6b35',
        marginHorizontal: 4,
        transform: [{ translateY: bounceAnim }],
      }}
    />
  );
};