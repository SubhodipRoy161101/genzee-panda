// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwpLwFHHrvyu_XkwC3odWcAFsj9OQEhEw",
  authDomain: "genzee-panda.firebaseapp.com",
  projectId: "genzee-panda",
  storageBucket: "genzee-panda.appspot.com",
  messagingSenderId: "508707651873",
  appId: "1:508707651873:web:4fcef523addad636a23e60",
  measurementId: "G-8K2GRMPKJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
