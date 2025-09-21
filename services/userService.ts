import { db } from "@/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Update user profile fields (partial update)
export const updateUserProfile = async (uid: string, data: any) => {
  const ref = doc(db, "users", uid);
  // Use setDoc with merge to allow partial update
  await setDoc(ref, data, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};
