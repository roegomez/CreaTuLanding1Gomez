import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key-here",
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