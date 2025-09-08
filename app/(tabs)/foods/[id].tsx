import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFood } from "../../../services/foodService";
import { Food } from "../../../types/food";
import { Ionicons } from "@expo/vector-icons";
import { addFavouriteTxn, getMyFavourites, removeFavouriteTxn } from "../../../services/favouritesService";
import { useTheme } from "../../../context/ThemeContext";
import { useI18n } from "../../../context/I18nContext";

export default function FoodDetails() {
  const { id } = useLocalSearchParams<{id:string}>();
  const [food,setFood]=React.useState<Food|undefined>();
  const [isFav,setIsFav]=React.useState(false);
  const { colors } = useTheme(); const { t } = useI18n();

  React.useEffect(()=>{ (async ()=>{
    const f = await getFood(id!); setFood(f!);
    const favIds: string[] = await getMyFavourites().catch(()=>[]);
    setIsFav(favIds.includes(id!));
  })(); },[id]);

  if (!food) return null;

  const toggle = async () => {
    if (isFav){ await removeFavouriteTxn(food.id); setIsFav(false); }
    else { await addFavouriteTxn(food); setIsFav(true); }
  };

  return (
    <ScrollView style={{flex:1, backgroundColor: colors.bg}}>
      <Image source={{uri: food.imageUrl}} style={{width:"100%", height:250}} />
      <View style={{padding:16}}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={{color: colors.text, fontSize:22, fontWeight:"800"}}>{food.name}</Text>
          <TouchableOpacity onPress={toggle}><Ionicons name={isFav ? "heart" : "heart-outline"} size={26} color={colors.accent} /></TouchableOpacity>
        </View>
        <Text style={{color: colors.textMuted, marginTop:6}}>{food.description}</Text>

        <Text style={{color: colors.text, fontWeight:"700", marginTop:14}}>Nearby Restaurants</Text>
        {food.restaurants.map((r, idx) => (
          <View key={idx} style={{backgroundColor: colors.card, padding:12, borderRadius:12, marginTop:8}}>
            <Text style={{color: colors.text, fontWeight:"600"}}>{r.name}</Text>
            <Text style={{color: colors.textMuted}}>{r.address}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
