import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Food } from "../types/food";

export default function FoodCard({ item, onPress, onHeart, isFav }:{
  item: Food; onPress: ()=>void; onHeart: ()=>void; isFav: boolean;
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: colors.card, borderRadius:16, overflow:"hidden"}}>
      <Image source={{uri:item.imageUrl}} style={{width:"100%", height:140}} />
      <View style={{padding:10}}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={{color: colors.text, fontWeight:"700"}} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={onHeart}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>
        <Text style={{color: colors.textMuted, fontSize:12}} numberOfLines={1}>
          {item.region}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
