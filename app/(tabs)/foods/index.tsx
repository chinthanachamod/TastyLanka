import React from "react";
import { View, TextInput, FlatList, ViewStyle } from "react-native";
import { getFoods } from "../../../services/foodService";
import { getMyFavourites, addFavouriteTxn, removeFavouriteTxn } from "../../../services/favouritesService";
import FoodCard from "../../../components/FoodCard";
import { useTheme } from "../../../context/ThemeContext";
import { useI18n } from "../../../context/I18nContext";
import { Link, useRouter } from "expo-router";
import { Food } from "../../../types/food";

export default function Foods() {
  const { colors } = useTheme(); const { t } = useI18n(); const router = useRouter();
  const [foods,setFoods]=React.useState<Food[]>([]); const [favIds,setFavIds]=React.useState<string[]>([]);
  const [q,setQ]=React.useState("");

  React.useEffect(()=>{ (async ()=>{
    const [f,ids] = await Promise.all([getFoods(), getMyFavourites().catch(()=>[])]);
    setFoods(f); setFavIds(ids);
  })(); },[]);

  const filtered = foods.filter(x => x.name.toLowerCase().includes(q.toLowerCase()));

  const toggleFav = async (it: Food) => {
    const isFav = favIds.includes(it.id);
    if (isFav) { await removeFavouriteTxn(it.id); setFavIds(ids => ids.filter(id => id !== it.id)); }
    else { await addFavouriteTxn(it); setFavIds(ids => [...ids, it.id]); }
  };

  return (
    <View style={{flex:1, backgroundColor: colors.bg, padding:16}}>
      <TextInput
        value={q} onChangeText={setQ}
        placeholder={t("searchFoods")} placeholderTextColor={colors.textMuted}
        style={{backgroundColor: colors.surface, borderRadius:14, padding:12, color: colors.text, borderWidth:1, borderColor: colors.border}}
      />
      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        numColumns={2}
        columnWrapperStyle={{gap:12} as ViewStyle}
        contentContainerStyle={{gap:12, paddingTop:12}}
        renderItem={({item}) => (
          <FoodCard
            item={item}
            onPress={()=>router.push(`/(tabs)/foods/${item.id}`)}
            onHeart={()=>toggleFav(item)}
            isFav={favIds.includes(item.id)}
          />
        )}
      />
    </View>
  );
}
