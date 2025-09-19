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
import { View, TextInput, FlatList, ViewStyle, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFoods } from "../../../services/foodService";
import {
  getMyFavourites,
  addFavouriteTxn,
  removeFavouriteTxn,
} from "../../../services/favouritesService";
import FoodCard from "../../../components/FoodCard";
import { useTheme } from "../../../context/ThemeContext";
import { useI18n } from "../../../context/I18nContext";
import { useRouter } from "expo-router";
import { Food } from "../../../types/food";

export default function Foods() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();

  const [foods, setFoods] = React.useState<Food[]>([]);
  const [favIds, setFavIds] = React.useState<string[]>([]);
  const [q, setQ] = React.useState("");
  const [filtered, setFiltered] = React.useState<Food[]>([]);

  // ✅ Load foods + favourites
  React.useEffect(() => {
    (async () => {
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
    })();
  }, []);

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
    </View>
  );
}
