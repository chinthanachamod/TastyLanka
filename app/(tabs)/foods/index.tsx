// import React from "react";
// import { View, TextInput, FlatList, ViewStyle } from "react-native";
// import { getFoods } from "../../../services/foodService";
// import { getMyFavourites, addFavouriteTxn, removeFavouriteTxn } from "../../../services/favouritesService";
// import FoodCard from "../../../components/FoodCard";
// import { useTheme } from "../../../context/ThemeContext";
// import { useI18n } from "../../../context/I18nContext";
// import { Link, useRouter } from "expo-router";
// import { Food } from "../../../types/food";

// export default function Foods() {
//   const { colors } = useTheme(); const { t } = useI18n(); const router = useRouter();
//   const [foods,setFoods]=React.useState<Food[]>([]); const [favIds,setFavIds]=React.useState<string[]>([]);
//   const [q,setQ]=React.useState("");

//   React.useEffect(()=>{ (async ()=>{
//     const [f,ids] = await Promise.all([getFoods(), getMyFavourites().catch(()=>[])]);
//     setFoods(f); setFavIds(ids);
//   })(); },[]);

//   const filtered = foods.filter(x => x.name.toLowerCase().includes(q.toLowerCase()));

//   const toggleFav = async (it: Food) => {
//     const isFav = favIds.includes(it.id);
//     if (isFav) { await removeFavouriteTxn(it.id); setFavIds(ids => ids.filter(id => id !== it.id)); }
//     else { await addFavouriteTxn(it); setFavIds(ids => [...ids, it.id]); }
//   };

//   return (
//     <View style={{flex:1, backgroundColor: colors.bg, padding:16}}>
//       <TextInput
//         value={q} onChangeText={setQ}
//         placeholder={t("searchFoods")} placeholderTextColor={colors.textMuted}
//         style={{backgroundColor: colors.surface, borderRadius:14, padding:12, color: colors.text, borderWidth:1, borderColor: colors.border}}
//       />
//       <FlatList
//         data={filtered}
//         keyExtractor={i=>i.id}
//         numColumns={2}
//         columnWrapperStyle={{gap:12} as ViewStyle}
//         contentContainerStyle={{gap:12, paddingTop:12}}
//         renderItem={({item}) => (
//           <FoodCard
//             item={item}
//             onPress={()=>router.push(`/(tabs)/foods/${item.id}`)}
//             onHeart={()=>toggleFav(item)}
//             isFav={favIds.includes(item.id)}
//           />
//         )}
//       />
//     </View>
//   );
// }

import React from "react";
import { View, TextInput, FlatList, ViewStyle, Text } from "react-native";
import { getFoods } from "../../../services/foodService";
import {
  getMyFavourites,
  addFavouriteTxn,
  removeFavouriteTxn,
} from "../../../services/favouritesService";
import FoodCard from "../../../components/FoodCard"; // ✅ FoodCard import
import { useTheme } from "../../../context/ThemeContext";
import { useI18n } from "../../../context/I18nContext";
import { useRouter } from "expo-router";
import { Food } from "../../../types/food";

// ✅ Sample foods (fallback if API fails)
const sampleFastFoods: Food[] = [
  {
    id: "slff-1",
    name: "Kottu Roti",
    region: "Colombo",
    rating: 4.8,
    imageUrl:
      "https://www.nestleprofessional.in/sites/default/files/2022-08/Kottu-756x471.jpg?w=400",
    description:
      "Chopped roti stir-fried with vegetables, eggs, and choice of meat, seasoned with aromatic spices and served hot.",
    restaurants: [
      { name: "Pilawoos", address: "Galle Road, Colombo", lat: 6.9271, lng: 79.8612 },
      { name: "Bombay Sweet Mahal", address: "Pettah, Colombo", lat: 6.9344, lng: 79.8508 },
    ],
    favouritesCount: 1250,
    tags: ["street food", "spicy", "quick meal"],
  },
  {
    id: "slff-2",
    name: "Hoppers (Appa)",
    region: "Southern",
    rating: 4.6,
    imageUrl:
      "https://i0.wp.com/www.lavenderandlovage.com/wp-content/uploads/2016/05/Sri-Lankan-Egg-Hoppers-for-Breakfast.jpg?fit=1200%2C901&ssl=1?w=400",
    description:
      "Bowl-shaped pancakes made from fermented rice flour and coconut milk, often with an egg in the center.",
    restaurants: [
      { name: "Nana's Hoppers", address: "Galle", lat: 6.0329, lng: 80.2168 },
      { name: "Upali's", address: "Colombo 7", lat: 6.9022, lng: 79.8607 },
    ],
    favouritesCount: 980,
    tags: ["breakfast", "vegetarian", "coconut"],
  },
  {
    id: "slff-3",
    name: "String Hoppers (Idiyappam)",
    region: "Jaffna",
    rating: 4.5,
    imageUrl:
      "https://tb-static.uber.com/prod/image-proc/processed_images/b895a684f043c79d93790099b39bd22c/820883a48567670acbd720bc76391291.jpeg?w=400",
    description:
      "Steamed rice noodles served with curry, sambol, and sometimes coconut milk.",
    restaurants: [
      { name: "Jaffna Heritage", address: "Jaffna Town", lat: 9.6615, lng: 80.0255 },
      { name: "Mango Tree", address: "Colombo 3", lat: 6.9106, lng: 79.8542 },
    ],
    favouritesCount: 750,
    tags: ["breakfast", "vegetarian", "noodles"],
  },
  {
    id: "slff-4",
    name: "Egg Roti",
    region: "Hill Country",
    rating: 4.4,
    imageUrl: "https://i.ytimg.com/vi/3KTPzspKhHI/maxresdefault.jpg?w=400",
    description:
      "Flatbread stuffed with spiced egg mixture and pan-fried to perfection.",
    restaurants: [
      { name: "Kandy Street Food", address: "Kandy", lat: 7.2906, lng: 80.6337 },
      { name: "Nuwara Eliya Night Market", address: "Nuwara Eliya", lat: 6.9497, lng: 80.7891 },
    ],
    favouritesCount: 620,
    tags: ["street food", "quick meal", "egg"],
  },
  {
    id: "slff-5",
    name: "Vadai",
    region: "Northern",
    rating: 4.3,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/63853bbd17ae0f4557bfa6ff/4daffa6e-4cc6-482e-8cff-18a26e6af9a9/Parippu+Vadai.jpg?w=400",
    description:
      "Crispy deep-fried lentil fritters with spices and onions, a popular snack.",
    restaurants: [
      { name: "Northern Delights", address: "Jaffna", lat: 9.6615, lng: 80.0255 },
      { name: "Colombo Vadai Corner", address: "Pettah, Colombo", lat: 6.9344, lng: 79.8508 },
    ],
    favouritesCount: 890,
    tags: ["snack", "vegetarian", "crispy"],
  },
  {
    id: "slff-6",
    name: "Chicken Curry",
    region: "Countrywide",
    rating: 4.7,
    imageUrl:
      "https://cookstrap.com/storage/images/T1ov27pBOVXpmmYi2RECo9L5Y81hzEuzF0kBWbgl.jpg?w=400",
    description:
      "Spicy Sri Lankan chicken curry cooked with roasted spices and coconut milk.",
    restaurants: [
      { name: "Ministry of Crab", address: "Colombo Fort", lat: 6.9344, lng: 79.8508 },
      { name: "Green Cabin", address: "Colombo 3", lat: 6.9106, lng: 79.8542 },
    ],
    favouritesCount: 1350,
    tags: ["main course", "spicy", "non-vegetarian"],
  },
  {
    id: "slff-7",
    name: "Lamprais",
    region: "Burgher",
    rating: 4.6,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Lamprais_%282%29.jpg?w=400",
    description:
      "A Dutch Burgher influenced dish of rice cooked in stock with accompaniments, wrapped in banana leaves and baked.",
    restaurants: [
      { name: "Burgher Union", address: "Colombo 6", lat: 6.8789, lng: 79.8575 },
      { name: "Dutch Burgher Union", address: "Colombo 7", lat: 6.9022, lng: 79.8607 },
    ],
    favouritesCount: 720,
    tags: ["traditional", "special occasion", "fusion"],
  },
];

export default function Foods() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();

  const [foods, setFoods] = React.useState<Food[]>([]);
  const [favIds, setFavIds] = React.useState<string[]>([]);
  const [q, setQ] = React.useState("");

  // ✅ Load foods + favourites (with fallback)
  React.useEffect(() => {
    (async () => {
      try {
        const [f, ids] = await Promise.all([
          getFoods(),
          getMyFavourites().catch(() => []),
        ]);
        setFoods(f);
        setFavIds(ids);
      } catch (error) {
        console.log("Using sample data due to API error:", error);
        setFoods(sampleFastFoods);
        setFavIds([]);
      }
    })();
  }, []);

  // ✅ Filter foods by search query
  const filtered = foods.filter((x) =>
    x.name.toLowerCase().includes(q.toLowerCase())
  );

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
      {/* Search bar */}
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder={t("searchFoods")}
        placeholderTextColor={colors.textMuted}
        style={{
          backgroundColor: colors.surface,
          borderRadius: 14,
          padding: 12,
          color: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 12,
        }}
      />

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
    </View>
  );
}


