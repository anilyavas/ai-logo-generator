# AI Logo Generator

A simple mobile app that uses OpenAI's image generation model to create logos based on user input. Users can type a prompt, select a style, and generate logos. The results are saved to Firestore, and users can view them on a results page.

## Tech Stack

- **React Native** with **Expo**
- **OpenAI API** for generating logos
- **Firebase Firestore** for storing user-generated logos
- **Expo Router** for navigation
- **Tailwind CSS** for styling (via `nativewind`)

## Features

- **Prompt input**: Enter a description for the logo you'd like to generate.
- **Logo styles**: Select from predefined styles like "Monogram," "Abstract," or "Mascot."
- **Logo generation**: Submit the prompt and selected style to OpenAI’s API and generate the logo.
- **Firestore**: Store generated logos in Firebase Firestore for later viewing.
- **Result screen**: View the generated logo, along with the prompt and style.
- **Error handling**: Displays user-friendly error messages when the logo generation fails.
- **Responsive UI**: Full-width images for a polished design.

## How It Works

1. **User Interaction**: 
   - The user enters a prompt describing the desired logo (e.g., "A blue lion logo reading ‘HEXA’").
   - They select a logo style (e.g., "Monogram").

2. **Logo Generation**: 
   - When the user clicks "Create," the app sends the prompt and style to OpenAI's DALL·E API, which generates a 512x512 or 1024x1024 logo.
   - The logo is then displayed on the results page.

3. **Storage**:
   - The prompt, style, and image URL are stored in Firebase Firestore for persistence.
   
4. **Results**: 
   - Users can view the logo on the results screen, including the original prompt and style used for generation.

## Technologies Used

- **React Native**: For building the mobile app.
- **Expo**: For fast development with the Expo SDK.
- **OpenAI DALL·E API**: Used to generate logos based on prompts.
- **Firebase Firestore**: For storing generated logos and metadata.
- **Tailwind CSS** (via `nativewind`): For rapid and responsive styling.

## Author

- Developed by **ANIL YAVAŞ**

