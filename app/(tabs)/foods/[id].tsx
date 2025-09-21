
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Button, Image, Linking, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useI18n } from "../../../context/I18nContext";
import { useTheme } from "../../../context/ThemeContext";
import { addFavouriteTxn, getMyFavourites, removeFavouriteTxn } from "../../../services/favouritesService";
import { deleteFood, updateFood } from "../../../services/foodEditService";
import { getFood } from "../../../services/foodService";
import { Food } from "../../../types/food";

export default function FoodDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [food, setFood] = React.useState<Food | undefined>();
  const [isFav, setIsFav] = React.useState(false);
  const { colors } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editData, setEditData] = React.useState<Partial<Food>>({});
  const [loading, setLoading] = React.useState(false);

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

  // Check if current user is owner (by userId)
  const isOwner = user && food.userId && user.uid === food.userId;

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

  // Handle Edit
  const handleEdit = () => {
    setEditData({ ...food });
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    setLoading(true);
    try {
      await updateFood(food.id, editData);
      const updated = await getFood(food.id);
      setFood(updated!);
      setEditModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = () => {
    Alert.alert(
      t("Delete Food"),
      t("Are you sure you want to delete this food?"),
      [
        { text: t("Cancel"), style: "cancel" },
        {
          text: t("Delete"), style: "destructive", onPress: async () => {
            setLoading(true);
            await deleteFood(food.id);
            setLoading(false);
            router.back();
          }
        }
      ]
    );
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
         {/*break a new line  */}
        <View style={{ height: 15 }} />


        {/* User Info */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Ionicons name="person-circle-outline" size={18} color={colors.textMuted} />
          <Text
            style={{
              color: colors.textMuted,
              marginLeft: 6,
              fontStyle: "italic",
              fontSize: 13,
            }}
          >
            Food Added by :{" "}
            <Text style={{ fontWeight: "600", color: colors.text }}>{food.userName || "Unknown"}</Text>
          </Text>
        </View>

        {/* Edit/Delete Buttons for Owner */}
        {isOwner && (
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
            <TouchableOpacity
              style={{ backgroundColor: colors.accent, padding: 10, borderRadius: 8, marginRight: 8 }}
              onPress={handleEdit}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>{t('Edit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 10, borderRadius: 8 }}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>{t('Delete')}</Text>
            </TouchableOpacity>
          </View>
        )}


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
      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: colors.bg, padding: 24, borderRadius: 12, width: '90%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>{t('Edit Food')}</Text>
            <TextInput
              style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 10, color: colors.text }}
              value={editData.name}
              onChangeText={v => setEditData(d => ({ ...d, name: v }))}
              placeholder={t('Name')}
              placeholderTextColor={colors.textMuted}
            />
            <TextInput
              style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 10, color: colors.text }}
              value={editData.region}
              onChangeText={v => setEditData(d => ({ ...d, region: v }))}
              placeholder={t('Region')}
              placeholderTextColor={colors.textMuted}
            />
            <TextInput
              style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 10, color: colors.text }}
              value={editData.description}
              onChangeText={v => setEditData(d => ({ ...d, description: v }))}
              placeholder={t('Description')}
              placeholderTextColor={colors.textMuted}
              multiline
            />
            {/* Add more fields as needed */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
              <Button title={t('Cancel')} onPress={() => setEditModalVisible(false)} color={colors.textMuted} disabled={loading} />
              <View style={{ width: 10 }} />
              <Button title={t('Save')} onPress={handleEditSave} color={colors.accent} disabled={loading} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
