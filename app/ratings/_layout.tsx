import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function RatingsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.bg,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Reviews & Ratings',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Write Review',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}