import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { addFood } from '../../../services/foodService';

const AddFoodScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFood = async () => {
    if (!name || !description || !imageUrl || !price) {
      Alert.alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await addFood({
        name,
        description,
        imageUrl,
  // price: parseFloat(price), // Removed, not in Food type
        region: '',
        rating: 0,
        restaurants: [],
        favouritesCount: 0,
        tags: [],
      });
      Alert.alert('Food added successfully!');
      setName('');
      setDescription('');
      setImageUrl('');
      setPrice('');
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      Alert.alert('Error adding food', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Food name" />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
  <Text style={styles.label}>Image URL</Text>
  <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="Image URL" />
      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" />
      <Button title={loading ? 'Adding...' : 'Add Food'} onPress={handleAddFood} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginTop: 5 },
});

export default AddFoodScreen;
