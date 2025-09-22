import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ratingsService } from '../services/ratingsService';
import { CreateRatingRequest, UpdateRatingRequest } from '../types/rating';

interface RatingFormProps {
  initialRating?: number;
  initialReview?: string;
  isEditing?: boolean;
  ratingId?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({
  initialRating = 0,
  initialReview = '',
  isEditing = false,
  ratingId,
  onSubmit,
  onCancel,
}) => {
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors, isDark);

  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isSelected = starNumber <= rating;
      
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleStarPress(starNumber)}
          style={styles.starButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isSelected ? 'star' : 'star-outline'}
            size={32}
            color={isSelected ? colors.star : colors.textMuted}
          />
        </TouchableOpacity>
      );
    });
  };

  const validateForm = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return false;
    }
    
    if (review.trim().length < 10) {
      Alert.alert(
        'Review Too Short',
        'Please write at least 10 characters for your review.'
      );
      return false;
    }
    
    if (review.trim().length > 500) {
      Alert.alert(
        'Review Too Long',
        'Please keep your review under 500 characters.'
      );
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      if (isEditing && ratingId) {
        const updateData: UpdateRatingRequest = {
          rating,
          review: review.trim(),
        };
        await ratingsService.updateRating(ratingId, updateData);
        Alert.alert('Success', 'Your review has been updated!');
      } else {
        const createData: CreateRatingRequest = {
          rating,
          review: review.trim(),
        };
        await ratingsService.createRating(createData);
        Alert.alert('Success', 'Thank you for your review!');
      }
      
      onSubmit?.();
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return 'Terrible';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        {/* Header */}
        <Text style={styles.title}>
          {isEditing ? 'Edit Your Review' : 'Rate TastyLanka'}
        </Text>
        <Text style={styles.subtitle}>
          {isEditing 
            ? 'Update your experience with the app'
            : 'Share your experience with other users'
          }
        </Text>

        {/* Star Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
          <Text style={styles.ratingLabel}>
            {getRatingLabel(rating)}
          </Text>
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Tell us what you think about TastyLanka..."
            placeholderTextColor={colors.textMuted}
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={6}
            maxLength={500}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {review.length}/500 characters
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting 
                ? 'Submitting...' 
                : isEditing 
                  ? 'Update Review' 
                  : 'Submit Review'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    formContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
    },
    ratingSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    starButton: {
      padding: 8,
      marginHorizontal: 4,
    },
    ratingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.accent,
      textAlign: 'center',
    },
    reviewSection: {
      marginBottom: 32,
    },
    reviewInput: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      minHeight: 120,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    characterCount: {
      fontSize: 12,
      color: colors.textMuted,
      textAlign: 'right',
      marginTop: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      borderColor: colors.textMuted,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textMuted,
    },
    submitButton: {
      backgroundColor: colors.accent,
    },
    submitButtonDisabled: {
      backgroundColor: colors.accentMuted,
      opacity: 0.6,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
  });

export default RatingForm;