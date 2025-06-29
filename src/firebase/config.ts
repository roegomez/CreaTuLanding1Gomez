import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxYZ123456789abcdefghijklmnopqrstuvw",
  authDomain: "sabores-iguazu.firebaseapp.com",
  projectId: "sabores-iguazu",
  storageBucket: "sabores-iguazu.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);