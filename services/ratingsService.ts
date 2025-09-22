import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { CreateRatingRequest, Rating, RatingStats, UpdateRatingRequest } from "../types/rating";
import { auth, db } from "./firebase";

const RATINGS_COLLECTION = "ratings";

export const ratingsService = {
  // Create a new rating
  async createRating(data: CreateRatingRequest): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to create a rating");
    }

    // Check if user has already rated the app
    const existingRating = await this.getUserRating(user.uid);
    if (existingRating) {
      throw new Error("You have already rated this app. You can edit your existing rating.");
    }

    const ratingData = {
      userId: user.uid,
      userName: user.displayName || user.email?.split("@")[0] || "Anonymous User",
      userEmail: user.email,
      rating: data.rating,
      review: data.review,
      likes: [],
      dislikes: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, RATINGS_COLLECTION), ratingData);
    return docRef.id;
  },

  // Get all ratings
  async getAllRatings(): Promise<Rating[]> {
    const q = query(
      collection(db, RATINGS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    } as Rating));
  },

  // Get rating by specific user
  async getUserRating(userId: string): Promise<Rating | null> {
    const q = query(
      collection(db, RATINGS_COLLECTION),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    } as Rating;
  },

  // Get current user's rating
  async getCurrentUserRating(): Promise<Rating | null> {
    const user = auth.currentUser;
    if (!user) return null;
    
    return this.getUserRating(user.uid);
  },

  // Update a rating
  async updateRating(ratingId: string, data: UpdateRatingRequest): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to update a rating");
    }

    // Verify the rating belongs to the current user
    const ratingDoc = await getDoc(doc(db, RATINGS_COLLECTION, ratingId));
    if (!ratingDoc.exists()) {
      throw new Error("Rating not found");
    }

    const ratingData = ratingDoc.data();
    if (ratingData.userId !== user.uid) {
      throw new Error("You can only update your own rating");
    }

    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(doc(db, RATINGS_COLLECTION, ratingId), updateData);
  },

  // Delete a rating
  async deleteRating(ratingId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to delete a rating");
    }

    // Verify the rating belongs to the current user
    const ratingDoc = await getDoc(doc(db, RATINGS_COLLECTION, ratingId));
    if (!ratingDoc.exists()) {
      throw new Error("Rating not found");
    }

    const ratingData = ratingDoc.data();
    if (ratingData.userId !== user.uid) {
      throw new Error("You can only delete your own rating");
    }

    await deleteDoc(doc(db, RATINGS_COLLECTION, ratingId));
  },

  // Like a rating
  async likeRating(ratingId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to like a rating");
    }

    const ratingRef = doc(db, RATINGS_COLLECTION, ratingId);
    
    // Remove from dislikes if present, add to likes
    await updateDoc(ratingRef, {
      dislikes: arrayRemove(user.uid),
      likes: arrayUnion(user.uid),
    });
  },

  // Dislike a rating
  async dislikeRating(ratingId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to dislike a rating");
    }

    const ratingRef = doc(db, RATINGS_COLLECTION, ratingId);
    
    // Remove from likes if present, add to dislikes
    await updateDoc(ratingRef, {
      likes: arrayRemove(user.uid),
      dislikes: arrayUnion(user.uid),
    });
  },

  // Remove like/dislike
  async removeLikeDislike(ratingId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated to remove like/dislike");
    }

    const ratingRef = doc(db, RATINGS_COLLECTION, ratingId);
    
    // Remove user from both likes and dislikes
    await updateDoc(ratingRef, {
      likes: arrayRemove(user.uid),
      dislikes: arrayRemove(user.uid),
    });
  },

  // Get rating statistics
  async getRatingStats(): Promise<RatingStats> {
    const ratings = await this.getAllRatings();
    
    if (ratings.length === 0) {
      return {
        totalRatings: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = sumRatings / totalRatings;

    const ratingDistribution = ratings.reduce(
      (dist, rating) => {
        dist[rating.rating as keyof typeof dist]++;
        return dist;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    return {
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      ratingDistribution,
    };
  },
};