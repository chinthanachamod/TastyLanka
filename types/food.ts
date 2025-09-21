export type Food = {
  id: string;
  name: string;
  region: string;             // e.g., "Jaffna", "Kandy"
  categories: string[];        // e.g., "Dessert", "Main Course"
  rating: number;             // 0..5
  imageUrl: string;           // Storage or http
  description: string;
  restaurants: { name: string; address: string; lat: number; lng: number; }[];
  favouritesCount: number;
  userName: string;           // Name of the user who added the food
  userId: string;             // UID of the user who added the food
  // tags: string[];
};
