import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Pressable, SafeAreaView } from 'react-native';

export default function Details() {
  const { imageUrl, prompt, style } = useLocalSearchParams();

  const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  const userPrompt = Array.isArray(prompt) ? prompt[0] : prompt;
  const selectedStyle = Array.isArray(style) ? style[0] : style;

  return (
    <View className="flex-1">
      <LinearGradient style={{ flex: 1 }} colors={['#09090B', '#1C55FF', '#C26CFF', '#09090B']}>
        <SafeAreaView className="flex-1">
          <View className="m-4 flex-row justify-between">
            <Text className="mx-4 text-2xl font-extrabold text-[#FAFAFA]">Your Design</Text>
            <Pressable onPress={() => router.back()} className="mx-4">
              <Entypo name="cross" size={20} color="#FAFAFA" />
            </Pressable>
          </View>
          <View className="m-4">
            <Image
              source={{ uri: url }}
              style={{ width: '100%', height: 342, borderRadius: 16 }}
              resizeMode="cover"
            />
          </View>
          <View className="m-4 gap-2 rounded-md bg-[#27272A] p-4">
            <Text className="text-md font-semibold text-[#FAFAFA]">Prompt</Text>
            <Text className="text-lg text-[#FAFAFA]">{userPrompt}</Text>
            <Text className="text-sm text-[#FAFAFA]/50">{selectedStyle}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
