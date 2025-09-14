// import { auth, db } from "./firebase";
// import { collection, deleteDoc, doc, getDocs, query, runTransaction, setDoc, where } from "firebase/firestore";
// import { Food } from "../types/food";

// export const favCol = (uid: string) => collection(db, "users", uid, "favourites");

// export const addFavouriteTxn = async (food: Food) => {
//   const uid = auth.currentUser?.uid!;
//   const favRef = doc(db, "users", uid, "favourites", food.id);
//   const foodRef = doc(db, "foods", food.id);

//   await runTransaction(db, async (tx) => {
//     tx.set(favRef, { addedAt: Date.now(), foodId: food.id });
//     const f = await tx.get(foodRef);
//     const current = (f.data()?.favouritesCount ?? 0) + 1;
//     tx.set(foodRef, { favouritesCount: current }, { merge: true });
//   });
// };

// export const removeFavouriteTxn = async (foodId: string) => {
//   const uid = auth.currentUser?.uid!;
//   const favRef = doc(db, "users", uid, "favourites", foodId);
//   const foodRef = doc(db, "foods", foodId);

//   await runTransaction(db, async (tx) => {
//     tx.delete(favRef);
//     const f = await tx.get(foodRef);
//     const current = Math.max(0, (f.data()?.favouritesCount ?? 0) - 1);
//     tx.set(foodRef, { favouritesCount: current }, { merge: true });
//   });
// };

// export const getMyFavourites = async (): Promise<string[]> => {
//   const uid = auth.currentUser?.uid!;
//   const q = query(favCol(uid));
//   const snap = await getDocs(q);
//   return snap.docs.map(d => d.id);
// };


import { auth, db } from "@/services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
} from "firebase/firestore";
import { Food } from "@/types/food";

/**
 * Reference to the user's favourites subcollection
 */
const favCol = (uid: string) => collection(db, "users", uid, "favourites");

/**
 * Add a food to favourites (transaction increments count)
 */
export const addFavouriteTxn = async (food: Food): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  const favRef = doc(db, "users", uid, "favourites", food.id);
  const foodRef = doc(db, "foods", food.id);

  await runTransaction(db, async (tx) => {
    tx.set(favRef, { addedAt: Date.now(), foodId: food.id });
    const f = await tx.get(foodRef);
    const current = (f.data()?.favouritesCount ?? 0) + 1;
    tx.set(foodRef, { favouritesCount: current }, { merge: true });
  });
};

/**
 * Remove a food from favourites (transaction decrements count)
 */
export const removeFavouriteTxn = async (foodId: string): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  const favRef = doc(db, "users", uid, "favourites", foodId);
  const foodRef = doc(db, "foods", foodId);

  await runTransaction(db, async (tx) => {
    tx.delete(favRef);
    const f = await tx.get(foodRef);
    const current = Math.max(0, (f.data()?.favouritesCount ?? 0) - 1);
    tx.set(foodRef, { favouritesCount: current }, { merge: true });
  });
};

/**
 * Get current user's favourite IDs
 */
export const getMyFavourites = async (): Promise<string[]> => {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const q = query(favCol(uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.id);
};

/**
 * Get favourites for a specific user (admin use case, etc.)
 */
export const getUserFavourites = async (userId: string): Promise<string[]> => {
  if (!userId) return [];
  const snap = await getDocs(collection(db, `users/${userId}/favourites`));
  return snap.docs.map((d) => d.id);
};
