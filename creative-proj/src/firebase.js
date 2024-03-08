import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC61tX045j2eDK55aHWlvY8tr82u3pk2kg",
  authDomain: "test-ef499.firebaseapp.com",
  projectId: "test-ef499",
  storageBucket: "test-ef499.appspot.com",
  messagingSenderId: "856305478039",
  appId: "1:856305478039:web:773f14624982a4b232bcd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)