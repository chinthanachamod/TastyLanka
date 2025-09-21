import { db } from "@/services/firebase";
import { Food } from "@/types/food";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";


const foodsCol = collection(db, "foods");

/**
 * Add a new food to Firestore
 */
export const addFood = async (food: Omit<Food, "id">): Promise<string> => {
  const { addDoc } = await import("firebase/firestore");
  // userName is now required in food
  const docRef = await addDoc(foodsCol, food);
  return docRef.id;
};


/**
 * Get all foods, ordered by name
 */
export const getFoods = async (): Promise<Food[]> => {
  const snap = await getDocs(query(foodsCol, orderBy("name")));
  return snap.docs.map((d) => ({ ...(d.data() as Food), id: d.id }));
};

/**
 * Get top 10 trending foods (by favouritesCount)
 */
export const getTrendingFoods = async (): Promise<Food[]> => {
  const snap = await getDocs(
    query(foodsCol, orderBy("favouritesCount", "desc"), limit(10))
  );
  return snap.docs.map((d) => ({ ...(d.data() as Food), id: d.id }));
};

/**
 * Get a single food by ID
 */
export const getFood = async (id: string): Promise<Food | null> => {
  const ref = doc(db, "foods", id);
  const s = await getDoc(ref);
  return s.exists() ? { ...(s.data() as Food), id: s.id } : null;
};

/**
 * Get multiple foods by their document IDs
 */
export const getFoodsByIds = async (ids: string[]): Promise<Food[]> => {
  if (ids.length === 0) return [];
  // Firestore "in" queries support max 10 IDs at a time
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 10) {
    chunks.push(ids.slice(i, i + 10));
  }

  const results: Food[] = [];
  for (const chunk of chunks) {
    const q = query(collection(db, "foods"), where("__name__", "in", chunk));
    const snapshot = await getDocs(q);
    results.push(
  ...snapshot.docs.map((doc) => ({ ...(doc.data() as Food), id: doc.id }))
    );
  }

  return results;
};
