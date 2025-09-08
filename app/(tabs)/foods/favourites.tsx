import React from "react";
import { View, FlatList, Text } from "react-native";
import { getMyFavourites } from "@/services/favouritesService";
import { getFood } from "@/services/foodService";
import { Food } from "@/types/food";
import FoodCard from "@/components/FoodCard";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";

export default function Favourites() {
  const { colors } = useTheme(); const { t } = useI18n(); const router = useRouter();
  const [foods,setFoods]=React.useState<Food[]>([]);

  React.useEffect(()=>{ (async ()=>{
    const ids = await getMyFavourites().catch(()=>[]);      // get IDs
    const docs = await Promise.all(ids.map(id=>getFood(id)));       // get details
    setFoods(docs.filter(Boolean) as Food[]);       // filter out nulls
  })(); },[]);

  return (
    <View style={{flex:1, backgroundColor: colors.bg, padding:16}}>
      <FlatList
        data={foods}
        keyExtractor={i=>i.id}
        renderItem={({item}) => (
          <FoodCard item={item} onPress={()=>router.push(`/(tabs)/foods/${item.id}`)} onHeart={()=>{}} isFav />
        )}
        ListEmptyComponent={<Text style={{color:colors.textMuted}}>{t("favourites")} empty</Text>}
        contentContainerStyle={{gap:12}}
      />
    </View>
  );
}
