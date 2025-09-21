import { db } from "@/services/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const updateFood = async (id: string, data: Partial<Omit<import("@/types/food").Food, "id">>) => {
  const ref = doc(db, "foods", id);
  await updateDoc(ref, data);
};

export const deleteFood = async (id: string) => {
  const ref = doc(db, "foods", id);
  await deleteDoc(ref);
};
