import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import FoodCard from "../../../components/FoodCard";
import { useI18n } from "../../../context/I18nContext";
import { useTheme } from "../../../context/ThemeContext";
import {
  addFavouriteTxn,
  getMyFavourites,
  removeFavouriteTxn,
} from "../../../services/favouritesService";
import { getFoods } from "../../../services/foodService";
import { Food } from "../../../types/food";

export default function Foods() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();

  const [foods, setFoods] = React.useState<Food[]>([]);
  const [favIds, setFavIds] = React.useState<string[]>([]);
  const [q, setQ] = React.useState("");
  const [filtered, setFiltered] = React.useState<Food[]>([]);

  // Load foods + favourites
  const loadFoods = useCallback(async () => {
    try {
      const [f, ids] = await Promise.all([
        getFoods(),
        getMyFavourites().catch(() => []),
      ]);
      setFoods(f);
      setFiltered(f); // show all foods initially
      setFavIds(ids);
    } catch (error) {
      console.log("Error loading foods:", error);
    }
  }, []);

  // Refresh foods when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadFoods();
    }, [loadFoods])
  );

  // ✅ Search when pressing the button
  const handleSearch = () => {
    if (!q.trim()) {
      setFiltered(foods); // reset to all if search is empty
    } else {
      const result = foods.filter((x) =>
        x.name.toLowerCase().includes(q.toLowerCase())
      );
      setFiltered(result);
    }
  };

  // ✅ Handle favourite toggle
  const toggleFav = async (it: Food) => {
    const isFav = favIds.includes(it.id);
    if (isFav) {
      await removeFavouriteTxn(it.id);
      setFavIds((ids) => ids.filter((id) => id !== it.id));
    } else {
      await addFavouriteTxn(it);
      setFavIds((ids) => [...ids, it.id]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      {/* Search bar + button */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder={t("searchFoods")}
          placeholderTextColor={colors.textMuted}
          style={{
            flex: 1,
            padding: 12,
            color: colors.text,
          }}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{ paddingHorizontal: 12 }}
        >
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Food list */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 } as ViewStyle}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => router.push(`/(tabs)/foods/${item.id}`)}
            onHeart={() => toggleFav(item)}
            isFav={favIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Text style={{ color: colors.textMuted, textAlign: "center" }}>
              No foods found. Try a different search term.
            </Text>
          </View>
        }
      />
      {/* Floating Add Food Button */}
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/foods/add')}
        style={{
          position: 'absolute',
          right: 24,
          bottom: 32,
          backgroundColor: colors.accent,
          borderRadius: 32,
          width: 56,
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
