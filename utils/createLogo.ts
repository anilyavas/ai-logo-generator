import { saveToFirestore } from './fireStore';

export const createLogo = async (prompt: string, style: string) => {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `${prompt} Style: ${style}`,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    const imageUrl = data.data[0].url;

    await saveToFirestore(prompt, style, imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Error in createLogo:', error);
    throw error;
  }
};
