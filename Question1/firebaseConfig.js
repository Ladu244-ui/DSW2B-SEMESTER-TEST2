import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBSlu-aUHnan7-SbEGxN4xXOt5mp81yHnc",
  authDomain: "dsw2b-test2-98e0c.firebaseapp.com",
  databaseURL: "https://dsw2b-test2-98e0c-default-rtdb.firebaseio.com/",
  projectId: "dsw2b-test2-98e0c",
  storageBucket: "dsw2b-test2-98e0c.firebasestorage.app",
  messagingSenderId: "650638477327",
  appId: "1:650638477327:web:d382962f922e704711bb7a",
  measurementId: "G-RREJW0MMDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If auth is already initialized, get the existing instance
  auth = getAuth(app);
}

// Initialize other services
const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, database, firestore };