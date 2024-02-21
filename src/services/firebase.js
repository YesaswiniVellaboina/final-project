// Import the functions you need from the SDKs you need
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-OMl-3hHmvd1gxB0ylYtU6AYgWsd90sk",
  authDomain: "medicationapp-9d608.firebaseapp.com",
  projectId: "medicationapp-9d608",
  storageBucket: "medicationapp-9d608.appspot.com",
  messagingSenderId: "1064331855883",
  appId: "1:1064331855883:web:fe9aa25f0790de4be31f0e",
  measurementId: "G-WWHPJXSSGV",
};

const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);
const firebaseAuth = getAuth(app);

export {
  firebaseDB,
  firebaseAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
};
