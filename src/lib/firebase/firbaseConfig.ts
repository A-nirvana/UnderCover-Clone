import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpMWUxjW5qzMyn8CR0bbJpQWQYaOC7Ibo",
  authDomain: "undercover-clone.firebaseapp.com",
  projectId: "undercover-clone",
  storageBucket: "undercover-clone.appspot.com",
  messagingSenderId: "546553765788",
  appId: "1:546553765788:web:af89ec11a157873caef259",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
