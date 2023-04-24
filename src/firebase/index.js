import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  // onSnapshot,
  // addDoc,
  // deleteDoc,
  // doc,
  // query,
  // where,
  // orderBy,
  // serverTimestamp,
  // getDoc,
  // updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXoDZ2Ks_8_FM8CXvxRA7A8cN5ZfnmVWk",
  authDomain: "travooler-backend.firebaseapp.com",
  projectId: "travooler-backend",
  storageBucket: "travooler-backend.appspot.com",
  messagingSenderId: "235277263516",
  appId: "1:235277263516:web:9f4d18a6eeea01a674c359",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firestore = getFirestore();
export const auth = getAuth();

export const usersRef = collection(firestore, "Users");

//collection
