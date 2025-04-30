// lib/createLogo.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const createLogo = async (prompt: string, style: string) => {
  try {
    const finalPrompt = style === 'No Style' ? prompt : `${prompt}. Style: ${style}`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();

    if (!data?.data?.[0]?.url) throw new Error('Image generation failed');

    const imageUrl = data.data[0].url;

    await addDoc(collection(db, 'logos'), {
      prompt,
      style,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    return imageUrl;
  } catch (error) {
    console.error('Error in createLogo:', error);
    throw error;
  }
};
