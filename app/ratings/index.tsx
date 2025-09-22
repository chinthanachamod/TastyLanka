import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Loader from '../../components/Loader';
import RatingCard from '../../components/RatingCard';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { useTheme } from '../../context/ThemeContext';
import { ratingsService } from '../../services/ratingsService';
import { Rating, RatingStats } from '../../types/rating';

export default function RatingsIndex() {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const { t } = useI18n();
  const styles = createStyles(colors, isDark);

  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userRating, setUserRating] = useState<Rating | null>(null);

  const loadRatings = async () => {
    try {
      const [ratingsData, statsData, currentUserRating] = await Promise.all([
        ratingsService.getAllRatings(),
        ratingsService.getRatingStats(),
        user ? ratingsService.getCurrentUserRating() : Promise.resolve(null),
      ]);
      
      setRatings(ratingsData);
      setStats(statsData);
      setUserRating(currentUserRating);
    } catch (error) {
      console.error('Error loading ratings:', error);
      Alert.alert('Error', 'Failed to load ratings. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRatings();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRatings();
  }, []);

  const handleAddReview = () => {
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'Please log in to write a review.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/(auth)/login') },
        ]
      );
      return;
    }

    if (userRating) {
      Alert.alert(
        'Review Already Exists',
        'You have already written a review. Would you like to edit it?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Edit Review', onPress: () => router.push('/ratings/add') },
        ]
      );
      return;
    }

    router.push('/ratings/add');
  };

  const renderStatsHeader = () => {
    if (!stats || stats.totalRatings === 0) {
      return (
        <View style={styles.emptyStatsContainer}>
          <Ionicons name="star-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyStatsTitle}>No Reviews Yet</Text>
          <Text style={styles.emptyStatsSubtitle}>
            Be the first to share your experience!
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.statsContainer}>
        <View style={styles.overallRating}>
          <Text style={styles.averageRating}>{stats.averageRating}</Text>
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }, (_, index) => (
              <Ionicons
                key={index}
                name={index < Math.floor(stats.averageRating) ? 'star' : 'star-outline'}
                size={20}
                color={colors.star}
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.totalRatings}>
            {stats.totalRatings} {stats.totalRatings === 1 ? 'review' : 'reviews'}
          </Text>
        </View>

        <View style={styles.distributionContainer}>
          {Object.entries(stats.ratingDistribution)
            .reverse()
            .map(([star, count]) => (
              <View key={star} style={styles.distributionRow}>
                <Text style={styles.starNumber}>{star}</Text>
                <Ionicons name="star" size={14} color={colors.star} />
                <View style={styles.distributionBar}>
                  <View
                    style={[
                      styles.distributionFill,
                      {
                        width: `${stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0}%`,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.distributionCount}>{count}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubbles-outline" size={64} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>No Reviews Yet</Text>
      <Text style={styles.emptySubtitle}>
        Be the first to share your thoughts about TastyLanka!
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddReview}>
        <Text style={styles.emptyButtonText}>Write First Review</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ratings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RatingCard
            rating={item}
            onUpdate={loadRatings}
          />
        )}
        ListHeaderComponent={renderStatsHeader}
        ListEmptyComponent={stats?.totalRatings === 0 ? renderEmptyState : null}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddReview}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    listContainer: {
      padding: 16,
      paddingBottom: 100, // Space for FAB
    },
    statsContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    emptyStatsContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 40,
      marginBottom: 24,
      alignItems: 'center',
    },
    emptyStatsTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyStatsSubtitle: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
    },
    overallRating: {
      alignItems: 'center',
      marginBottom: 24,
    },
    averageRating: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    starsRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    totalRatings: {
      fontSize: 16,
      color: colors.textMuted,
      fontWeight: '500',
    },
    distributionContainer: {
      gap: 8,
    },
    distributionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    starNumber: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
      width: 12,
    },
    distributionBar: {
      flex: 1,
      height: 8,
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      borderRadius: 4,
      overflow: 'hidden',
    },
    distributionFill: {
      height: '100%',
      borderRadius: 4,
    },
    distributionCount: {
      fontSize: 14,
      color: colors.textMuted,
      fontWeight: '500',
      width: 24,
      textAlign: 'right',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 32,
      lineHeight: 22,
    },
    emptyButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
    },
    emptyButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
  });