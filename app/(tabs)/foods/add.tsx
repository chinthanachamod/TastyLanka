import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { addFood } from '../../../services/foodService';

const AddFoodScreen = () => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [restaurants, setRestaurants] = useState([{ name: '' }]);
  const [rating, setRating] = useState(0);
  
  const categorySuggestions = [
    'Dessert', 'Main Course', 'Streetfood', 'Appetizer', 'Beverage', 
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Vegan', 
    'Vegetarian', 'Seafood', 'Traditional', 'Spicy', 'Sweet'
  ];
  
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFood = async () => {
    if (!name || !region || !description || !imageUrl) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }
    
    for (const r of restaurants) {
      if (!r.name) {
        Alert.alert('Missing Information', 'Please fill all restaurant names');
        return;
      }
    }
    
    setLoading(true);
    try {
      await addFood({
        name,
        region,
        imageUrl,
        description,
        restaurants: restaurants.map(r => ({
          name: r.name,
          address: '',
          lat: 0,
          lng: 0,
        })),
        rating,
        favouritesCount: 0,
        categories,
        // tags: [],
      });
      
      Alert.alert('Success', 'Food added successfully!');
      // Reset form
      setName('');
      setRegion('');
      setDescription('');
      setImageUrl('');
  setRestaurants([{ name: '' }]);
  setCategories([]);
  setCategoryInput('');
  setRating(0);
    } catch (error) {
      let message = 'Unknown error occurred';
      if (error instanceof Error) message = error.message;
      Alert.alert('Error', `Failed to add food: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: { 
      padding: 20, 
      backgroundColor: colors.bg 
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
      textAlign: 'center'
    },
    label: { 
      fontWeight: '600', 
      marginTop: 16, 
      marginBottom: 6,
      color: colors.text,
      fontSize: 16
    },
    input: { 
      borderWidth: 1, 
      borderColor: colors.border, 
      borderRadius: 12, 
      padding: 16, 
      marginTop: 5,
      backgroundColor: colors.surface,
      color: colors.text,
      fontSize: 16
    },
    categoryContainer: {
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      marginBottom: 12
    },
    categoryPill: {
      backgroundColor: colors.accent + '20',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginRight: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    categoryText: {
      color: colors.accent,
      fontWeight: '500'
    },
    suggestionPill: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border
    },
    suggestionText: {
      color: colors.text,
      fontSize: 14
    },
    restaurantCard: {
      marginBottom: 16, 
      borderWidth: 1, 
      borderColor: colors.border, 
      borderRadius: 16, 
      padding: 16, 
      backgroundColor: colors.surface
    },
    button: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      flexDirection: 'row'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 8
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12
    },
    secondaryButtonText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16
    },
    removeButton: {
      backgroundColor: '#ff3b30' + '20',
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      marginTop: 10
    },
    removeButtonText: {
      color: '#ff3b30',
      fontWeight: '600'
    },
    mapsButton: {
  backgroundColor: colors.accent + '10',
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    mapsButtonText: {
  color: colors.accent,
      fontWeight: '600',
      marginLeft: 6
    }
  });

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Add New Food</Text>
        
        <Text style={styles.label}>Food Name *</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter food name" 
          placeholderTextColor={colors.textMuted}
        />
        
        <Text style={styles.label}>Region *</Text>
        <TextInput 
          style={styles.input} 
          value={region} 
          onChangeText={setRegion} 
          placeholder="Enter region (e.g., Colombo, Jaffna)" 
          placeholderTextColor={colors.textMuted}
        />
        
        <Text style={styles.label}>Description *</Text>
        <TextInput 
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
          value={description} 
          onChangeText={setDescription} 
          placeholder="Describe this food item" 
          placeholderTextColor={colors.textMuted}
          multiline
        />
        
        <Text style={styles.label}>Image URL *</Text>
        <TextInput 
          style={styles.input} 
          value={imageUrl} 
          onChangeText={setImageUrl} 
          placeholder="Paste image URL" 
          placeholderTextColor={colors.textMuted}
        />

        {/* Rating Section */}
        <Text style={styles.label}>Rating</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          {[1,2,3,4,5].map(num => (
            <TouchableOpacity key={num} onPress={() => setRating(num)}>
              <Ionicons
                name={rating >= num ? 'star' : 'star-outline'}
                size={28}
                color={rating >= num ? colors.accent : colors.border}
                style={{ marginHorizontal: 2 }}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10, color: colors.text, fontWeight: '600' }}>{rating > 0 ? rating : ''}</Text>
        </View>

        {/* Categories Section */}
        <Text style={styles.label}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat, idx) => (
            <View key={cat+idx} style={styles.categoryPill}>
              <Text style={styles.categoryText}>{cat}</Text>
              <TouchableOpacity 
                onPress={() => setCategories(categories.filter((c, i) => i !== idx))}
                style={{ marginLeft: 6 }}
              >
                <Ionicons name="close-circle" size={18} color={colors.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <TextInput
          style={styles.input}
          value={categoryInput}
          onChangeText={setCategoryInput}
          placeholder="Add or select a category"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={() => {
            if (categoryInput && !categories.includes(categoryInput)) {
              setCategories([...categories, categoryInput]);
              setCategoryInput('');
            }
          }}
        />
        
        
        {/* Category Suggestions */}
        <Text style={{ fontWeight: '600', color: colors.text, marginTop: 10, marginBottom: 4, fontSize: 15 }}>
          Category Suggestions
        </Text>
        <View style={styles.categoryContainer}>
          {categorySuggestions
            .filter(s => s.toLowerCase().includes(categoryInput.toLowerCase()) && !categories.includes(s))
            .map(s => (
              <TouchableOpacity
                key={s}
                style={styles.suggestionPill}
                onPress={() => {
                  setCategories([...categories, s]);
                  setCategoryInput('');
                }}
              >
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))
          }
        </View>

        {/* Restaurants Section */}
        <Text style={styles.label}>Restaurants</Text>
        {restaurants.map((r, idx) => (
          <View key={idx} style={styles.restaurantCard}>
            <Text style={styles.label}>Restaurant Name</Text>
            <TextInput 
              style={styles.input} 
              value={r.name} 
              onChangeText={v => {
                const arr = [...restaurants]; 
                arr[idx].name = v; 
                setRestaurants(arr);
              }} 
              placeholder="Enter restaurant name" 
              placeholderTextColor={colors.textMuted}
            />
            
            <TouchableOpacity
              style={styles.mapsButton}
              onPress={() => {
                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name)}`;
                Linking.openURL(url);
              }}
            >
              <Ionicons name="map-outline" size={18} color={colors.accent} />
              <Text style={styles.mapsButtonText}>Search on Google Maps</Text>
            </TouchableOpacity>
            
            {restaurants.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => {
                  setRestaurants(restaurants.filter((_, i) => i !== idx));
                }}
              >
                <Text style={styles.removeButtonText}>Remove Restaurant</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setRestaurants([...restaurants, { name: '' }])}
        >
          <Text style={styles.secondaryButtonText}>
            <Ionicons name="add" size={18} /> Add Another Restaurant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleAddFood} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="restaurant" size={20} color="#fff" />
              <Text style={styles.buttonText}>Add Food</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddFoodScreen;
