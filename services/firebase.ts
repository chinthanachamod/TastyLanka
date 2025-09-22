import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrN_jzK32PjesXFvi8pRYw6L49-7DFYps",
  authDomain: "tastylanka-e9de3.firebaseapp.com",
  projectId: "tastylanka-e9de3",
  storageBucket: "tastylanka-e9de3.firebasestorage.app",
  messagingSenderId: "261282321718",
  appId: "1:261282321718:web:73ed2fa96c1538cce90f97",
  measurementId: "G-PQRCSMD0SP"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth - the AsyncStorage warning can be ignored for now
// as it will still work with memory persistence
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only if supported
let analytics: any = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app;
