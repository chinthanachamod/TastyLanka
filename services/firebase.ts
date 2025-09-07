import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export default app;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBrN_jzK32PjesXFvi8pRYw6L49-7DFYps",
//   authDomain: "tastylanka-e9de3.firebaseapp.com",
//   projectId: "tastylanka-e9de3",
//   storageBucket: "tastylanka-e9de3.firebasestorage.app",
//   messagingSenderId: "261282321718",
//   appId: "1:261282321718:web:73ed2fa96c1538cce90f97",
//   measurementId: "G-PQRCSMD0SP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);