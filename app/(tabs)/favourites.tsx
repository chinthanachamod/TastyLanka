import FoodCard from "@/components/FoodCard";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";
import { getMyFavourites, removeFavouriteTxn } from "@/services/favouritesService";
import { getFoodsByIds } from "@/services/foodService";
import { Food } from "@/types/food";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Favourites() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();

  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch favorites logic with debug logs and fallback
  const fetchFavourites = useCallback(async () => {
    try {
      setLoading(true);
      if (!user?.uid) {
        setFoods([]);
        console.log("No user UID");
        return;
      }
      const favIds = await getMyFavourites().catch((e) => { console.log("getMyFavourites error", e); return []; });
      console.log("Favorite IDs:", favIds);
      if (favIds.length > 0) {
        let favFoods: Food[] = [];
        try {
          favFoods = await getFoodsByIds(favIds);
          console.log("Fetched foods by IDs:", favFoods);
        } catch (batchErr) {
          console.log("Batch getFoodsByIds failed, trying one by one", batchErr);
          // fallback: fetch one by one
          const foodsArr = await Promise.all(favIds.map(async (id) => {
            try {
              const food = await import("@/services/foodService").then(m => m.getFood(id));
              return food;
            } catch (e) {
              console.log("Error fetching food", id, e);
              return null;
            }
          }));
          favFoods = foodsArr.filter(Boolean) as Food[];
        }
        setFoods(favFoods);
      } else {
        setFoods([]);
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Auto-refresh on focus
  useFocusEffect(
    useCallback(() => {
      fetchFavourites();
    }, [fetchFavourites])
  );

  const handleToggleFavourite = async (foodId: string) => {
    if (!user?.uid) return;
    try {
      // Remove favourite in DB
  await removeFavouriteTxn(foodId);
      // Update local state
      setFoods((prev) => prev.filter((f) => f.id !== foodId));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
  <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Search Bar */}
      <View style={{ position: 'relative', margin: 16 }}>
        <TextInput
          placeholder={t("search")}
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, paddingRight: 38 },
          ]}
        />
        <Ionicons
          name="search"
          size={20}
          color={colors.textMuted}
          style={{ position: 'absolute', right: 12, top: 14, zIndex: 1 }}
        />
      </View>

      {/* Favourites List */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            isFav
            onPress={() => router.push(`/(tabs)/foods/${item.id}`)}
            onHeart={() => handleToggleFavourite(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: colors.textMuted, fontSize: 16 }}>
              {t("favourites")} {t("empty")}
            </Text>
          </View>
        }
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
});
