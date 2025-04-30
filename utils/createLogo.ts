import { saveToFirestore } from './firestore';

export const createLogo = async (prompt: string, style: string) => {
  try {
    const finalPrompt = style === 'No Style' ? prompt.trim() : `${prompt.trim()} Style: ${style}`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        n: 1,
        size: '1024x1024',
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error.message || 'OpenAI generation failed.');
    }

    if (!data?.data || !Array.isArray(data.data) || !data.data[0]?.url) {
      console.error('Unexpected OpenAI response format:', JSON.stringify(data, null, 2));
      throw new Error('OpenAI returned unexpected response format.');
    }

    const imageUrl = data.data[0].url;

    await saveToFirestore(prompt, style, imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Error in createLogo:', error);
    throw error;
  }
};
