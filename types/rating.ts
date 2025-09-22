export interface Rating {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  rating: number; // 1-5 stars
  review: string;
  likes: string[]; // Array of user IDs who liked this review
  dislikes: string[]; // Array of user IDs who disliked this review
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRatingRequest {
  rating: number;
  review: string;
}

export interface UpdateRatingRequest {
  rating?: number;
  review?: string;
}

export interface RatingStats {
  totalRatings: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}