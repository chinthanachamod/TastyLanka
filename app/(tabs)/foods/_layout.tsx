import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const FavouritesLayout = () => {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: "FoodDetails", headerShown: false }} />
      <Stack.Screen name="add" options={{ title: "Add Food", headerShown: false }} />
    </Stack>
  )
}

export default FavouritesLayout
