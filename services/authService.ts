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
            
            console.log('Saving user profile with fullName:', name);
            const userProfile = {
                fullName: name,
                email: email,
                createdAt: Date.now(),
            };
            console.log('User profile object:', userProfile);
            
            await setDoc(doc(db, "users", cred.user.uid), userProfile);
            console.log('User profile saved successfully for UID:', cred.user.uid);
            return cred;
        });
}

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
    return signOut(auth)
}