import { auth } from "@/services/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

export const register = (name: string, email: string, password: string, confirmPassword: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (cred) => {
            // Save user profile to Firestore
            const { setDoc, doc } = await import("firebase/firestore");
            const { db } = await import("@/services/firebase");
            await setDoc(doc(db, "users", cred.user.uid), {
                fullName: name,
                email: email,
                createdAt: Date.now(),
            });
            return cred;
        });
}

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
    return signOut(auth)
}