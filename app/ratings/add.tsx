import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';
import Loader from '../../components/Loader';
import RatingForm from '../../components/RatingForm';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ratingsService } from '../../services/ratingsService';
import { Rating } from '../../types/rating';

export default function AddRating() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(colors);

  const [existingRating, setExistingRating] = useState<Rating | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingRating = async () => {
      if (!user) {
        router.replace('/(auth)/login');
        return;
      }

      try {
        const rating = await ratingsService.getCurrentUserRating();
        setExistingRating(rating);
      } catch (error) {
        console.error('Error checking existing rating:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingRating();
  }, [user]);

  const handleSubmit = () => {
    // Navigate back to ratings list
    router.back();
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <RatingForm
        initialRating={existingRating?.rating || 0}
        initialReview={existingRating?.review || ''}
        isEditing={!!existingRating}
        ratingId={existingRating?.id}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
  });