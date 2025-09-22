import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ratingsService } from '../services/ratingsService';
import { Rating } from '../types/rating';

interface RatingCardProps {
  rating: Rating;
  onUpdate?: () => void;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating, onUpdate }) => {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(colors, isDark);

  const isCurrentUserRating = user?.uid === rating.userId;
  const hasLiked = user ? rating.likes.includes(user.uid) : false;
  const hasDisliked = user ? rating.dislikes.includes(user.uid) : false;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={18}
        color={colors.star}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const handleLike = async () => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to like reviews.');
      return;
    }

    if (isCurrentUserRating) {
      Alert.alert('Invalid Action', 'You cannot like your own review.');
      return;
    }

    try {
      if (hasLiked) {
        await ratingsService.removeLikeDislike(rating.id);
      } else {
        await ratingsService.likeRating(rating.id);
      }
      onUpdate?.();
    } catch (error) {
      console.error('Error handling like:', error);
      Alert.alert('Error', 'Failed to update like status.');
    }
  };

  const handleDislike = async () => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to dislike reviews.');
      return;
    }

    if (isCurrentUserRating) {
      Alert.alert('Invalid Action', 'You cannot dislike your own review.');
      return;
    }

    try {
      if (hasDisliked) {
        await ratingsService.removeLikeDislike(rating.id);
      } else {
        await ratingsService.dislikeRating(rating.id);
      }
      onUpdate?.();
    } catch (error) {
      console.error('Error handling dislike:', error);
      Alert.alert('Error', 'Failed to update dislike status.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete your review? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ratingsService.deleteRating(rating.id);
              onUpdate?.();
              Alert.alert('Success', 'Your review has been deleted.');
            } catch (error) {
              console.error('Error deleting rating:', error);
              Alert.alert('Error', 'Failed to delete review.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {rating.userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{rating.userName}</Text>
            <Text style={styles.date}>{formatDate(rating.createdAt)}</Text>
          </View>
        </View>
        {isCurrentUserRating && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Rating Stars */}
      <View style={styles.starsContainer}>
        {renderStars(rating.rating)}
        <Text style={styles.ratingText}>({rating.rating}/5)</Text>
      </View>

      {/* Review Text */}
      {rating.review && (
        <Text style={styles.reviewText}>{rating.review}</Text>
      )}

      {/* Like/Dislike Actions */}
      {!isCurrentUserRating && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={handleLike}
            style={[styles.actionButton, hasLiked && styles.actionButtonActive]}
          >
            <Ionicons
              name={hasLiked ? 'thumbs-up' : 'thumbs-up-outline'}
              size={16}
              color={hasLiked ? colors.accent : colors.textMuted}
            />
            <Text style={[
              styles.actionText,
              hasLiked && { color: colors.accent }
            ]}>
              {rating.likes.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDislike}
            style={[styles.actionButton, hasDisliked && styles.actionButtonActive]}
          >
            <Ionicons
              name={hasDisliked ? 'thumbs-down' : 'thumbs-down-outline'}
              size={16}
              color={hasDisliked ? '#ff3b30' : colors.textMuted}
            />
            <Text style={[
              styles.actionText,
              hasDisliked && { color: '#ff3b30' }
            ]}>
              {rating.dislikes.length}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: colors.textMuted,
    },
    deleteButton: {
      padding: 4,
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    ratingText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
    },
    reviewText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      marginBottom: 12,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginRight: 12,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    },
    actionButtonActive: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    actionText: {
      marginLeft: 6,
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
    },
  });

export default RatingCard;