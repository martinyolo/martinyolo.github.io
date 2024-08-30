/* import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzK_9AnGr_5gGt5TqDfbtfETFL_B6tA4w",
  authDomain: "lunsj-786ec.firebaseapp.com",
  projectId: "lunsj-786ec",
  storageBucket: "lunsj-786ec.appspot.com",
  messagingSenderId: "63445965030",
  appId: "1:63445965030:web:b8e7f0d8a8b4f1a3bd8327"
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication service
export const auth = getAuth(app); */

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzK_9AnGr_5gGt5TqDfbtfETFL_B6tA4w",
  authDomain: "lunsj-786ec.firebaseapp.com",
  projectId: "lunsj-786ec",
  storageBucket: "lunsj-786ec.appspot.com",
  messagingSenderId: "63445965030",
  appId: "1:63445965030:web:b8e7f0d8a8b4f1a3bd8327"
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication service
export const auth = getAuth(app);

// Initialize Firestore
export const firestore = getFirestore(app);

// Users collection reference
export const usersCollection = collection(firestore, "users");
