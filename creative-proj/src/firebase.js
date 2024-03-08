import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGB_uCWPTJu1_2599Wwmu1lf1w3sxIeII",
  authDomain: "eng10-creative-project.firebaseapp.com",
  projectId: "eng10-creative-project",
  storageBucket: "eng10-creative-project.appspot.com",
  messagingSenderId: "100758931895",
  appId: "1:100758931895:web:56d97d0dfdfd7720e68032"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)