import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseapp.com`,
  projectId: `${process.env.EXPO_PUBLIC_PROJECT_ID}`,
  storageBucket: `${process.env.EXPO_PUBLIC_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.EXPO_PUBLIC_SENDER_ID}`,
  appId: `${process.env.EXPO_PUBLIC_FIREBASE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
