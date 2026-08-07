import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIZbgJ-3Dz6-FiiafLeFlliJIY3tTh8LM",
  authDomain: "anybook-a5632.firebaseapp.com",
  projectId: "anybook-a5632",
  storageBucket: "anybook-a5632.firebasestorage.app",
  messagingSenderId: "453156823963",
  appId: "1:453156823963:web:fc30ce91606f219e1bf73e",
  measurementId: "G-HLGTY02J7N"
};

// Initialize Firebase only once
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
