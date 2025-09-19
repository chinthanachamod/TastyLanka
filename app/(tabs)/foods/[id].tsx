import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useI18n } from "../../../context/I18nContext";
import { useTheme } from "../../../context/ThemeContext";
import { addFavouriteTxn, getMyFavourites, removeFavouriteTxn } from "../../../services/favouritesService";
import { getFood } from "../../../services/foodService";
import { Food } from "../../../types/food";

export default function FoodDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [food, setFood] = React.useState<Food | undefined>();
  const [isFav, setIsFav] = React.useState(false);
  const { colors } = useTheme();
  const { t } = useI18n();

  // Fetch food + favourites
  React.useEffect(() => {
    (async () => {
      const f = await getFood(id!);
      setFood(f!);

      const favIds: string[] = await getMyFavourites().catch(() => []);
      setIsFav(favIds.includes(id!));
    })();
  }, [id]);

  if (!food) return null;

  // Toggle favourite
  const toggle = async () => {
    if (isFav) {
      await removeFavouriteTxn(food.id);
      setIsFav(false);
    } else {
      await addFavouriteTxn(food);
      setIsFav(true);
    }
  };

  // Open Google Maps
  const openMap = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Food image */}
      <Image
        source={{ uri: food.imageUrl }}
        style={{ width: "100%", height: 250 }}
      />

      <View style={{ padding: 16 }}>
        {/* Title + Favourite */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>
              {food.name}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: 15, fontWeight: "600", marginTop: 2 }}>
              {food.region}
            </Text>
          </View>
          <TouchableOpacity onPress={toggle}>
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={26}
              color={isFav ? "red" : colors.accent}
            />
          </TouchableOpacity>
        </View>


        {/* Rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 2 }}>
          {[1,2,3,4,5].map(num => {
            let iconName: "star" | "star-half" | "star-o" = "star-o";
            if (food.rating >= num) {
              iconName = "star";
            } else if (food.rating >= num - 0.5) {
              iconName = "star-half";
            }
            return (
              <FontAwesome
                key={num}
                name={iconName}
                size={22}
                color={food.rating >= num - 0.5 ? colors.accent : colors.border}
                style={{ marginHorizontal: 1 }}
              />
            );
          })}
          <Text style={{ marginLeft: 8, color: colors.text, fontWeight: '700', fontSize: 16 }}>{food.rating?.toFixed(1)}</Text>
        </View>
        {/* Categories */}
        {food.categories && food.categories.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, marginBottom: 18 }}>
            {food.categories.map((cat, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.accent,
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  marginRight: 10,
                  marginBottom: 10,
                  shadowColor: colors.accent,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Ionicons name="pricetag" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{cat}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Description */}
        <Text style={{ color: colors.textMuted, marginTop: 6 }}>
          {food.description}
        </Text>

        {/* Restaurants */}
        <Text style={{ color: colors.text, fontWeight: "700", marginTop: 14 }}>
          {t("Nearby Restaurants")}
        </Text>
        {food.restaurants.map((r, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => openMap(r.lat, r.lng)}
            style={{
              backgroundColor: colors.card,
              padding: 12,
              borderRadius: 12,
              marginTop: 8,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "600" }}>{r.name}</Text>
            <Text style={{ color: colors.textMuted }}>{r.address}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
