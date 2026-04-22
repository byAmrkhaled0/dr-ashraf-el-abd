import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZOlWBHsykRwpYuVnlgd6M69aEKS3dqxI",
  authDomain: "ashraf-elite-fitness.firebaseapp.com",
  projectId: "ashraf-elite-fitness",
  storageBucket: "ashraf-elite-fitness.firebasestorage.app",
  messagingSenderId: "928480016149",
  appId: "1:928480016149:web:e44f9cb8484a1722995b1c",
  measurementId: "G-E22Z9RPDSD",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;