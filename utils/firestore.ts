// lib/firestore.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const saveToFirestore = async (prompt: string, style: string, imageUrl: string) => {
  try {
    const docRef = await addDoc(collection(db, 'logos'), {
      prompt,
      style,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};
